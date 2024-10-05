"use client";

import { createArrayBufferFromFile } from "@/utils/iExec/utils";
import { IExecDataProtector, ProtectedData } from "@iexec/dataprotector";
import { toast } from "sonner";
import { useSwitchChain } from "wagmi";

export const useiExec = () => {
  const BELLECOUR_CHAIN_ID = 134;

  const { switchChain } = useSwitchChain();

  const checkUserAddress = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // @ ts-ignore
      const userAddress = accounts?.[0];

      if (!userAddress) {
        return {
          data: null,
          error: {
            message: "Missing user address",
            value: true,
          },
        };
      } else {
        return {
          data: userAddress,
          error: null,
        };
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Error fetching user address",
          value: true,
        },
      };
    }
  };

  const createFile = async (data: string, dataName: string) => {
    if (!data || !dataName)
      return {
        data: null,
        error: {
          message: "Missing data or data name",
          value: true,
        },
      };
    var blob = new Blob([data], { type: "text/plain" });
    var file = new File([blob], dataName, { type: "text/plain" });

    return { data: file, error: null };
  };

  const checkCorrectChain = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (Number(chainId) !== BELLECOUR_CHAIN_ID) {
        toast("Invalid network, trying to switch to Bellecour network...");
        switchChain({ chainId: BELLECOUR_CHAIN_ID });

        return {
          data: null,
          error: {
            message: "Invalid network",
            value: true,
          },
        };
      } else {
        return {
          data: chainId,
          error: null,
        };
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Error fetching chain ID",
          value: true,
        },
      };
    }
  };

  const checkETHProvider = async () => {
    if (!window.ethereum) {
      return {
        data: null,
        error: {
          message: "Missing Ethereum provider. Please install Metamask.",
          value: true,
        },
      };
    } else {
      return {
        data: window.ethereum,
        error: null,
      };
    }
  };

  const checkSession = async () => {
    const { data: ethProvider, error: ethProviderError } = await checkETHProvider();
    const { data: userAddress, error } = await checkUserAddress();
    const { data: chainId, error: chainIdError } = await checkCorrectChain();

    if (ethProviderError?.value || error?.value || chainIdError?.value)
      return {
        data: null,
        error: {
          message: "Error checking user address, chain ID or ETH provider",
          value: true,
        },
      };

    if (!ethProvider || !userAddress || !chainId) {
      return {
        data: null,
        error: {
          message: "Missing ETH provider, user address or chain ID",
          value: true,
        },
      };
    } else {
      return {
        data: {
          ethProvider,
          userAddress,
          chainId,
        },
        error: null,
      };
    }
  };

  const encryptAndPushData = async (dataString: string, dataName: string) => {
    try {
      const { data: file, error: fileError } = await createFile(dataString, dataName);
      const { data: session, error: sessionError } = await checkSession();

      if (sessionError?.value || fileError?.value || !session)
        return {
          data: null,
          error: {
            message: "Error creating file or checking session",
            value: true,
          },
        };

      if (!file) {
        return {
          data: null,
          error: {
            message: "No file to encrypt and push",
            value: true,
          },
        };
      }

      if (file.size > 500000) {
        toast("File size is too large. Please upload a file smaller than 500KB.");
        return {
          data: null,
          error: {
            message: "File size is too large. Please upload a file smaller than 500KB.",
            value: true,
          },
        };
      }

      const bufferFile = await createArrayBufferFromFile(file);
      const dataProtector = new IExecDataProtector(window.ethereum);
      const protectedData = await dataProtector.core.protectData({
        name: file.name,
        data: {
          file: bufferFile,
        },
      });

      return {
        data: protectedData,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Error encrypting and pushing data",
          value: true,
        },
      };
    }
  };

  const getMyProtectedData = async () => {
    try {
      const { data: session, error: sessionError } = await checkSession();

      if (sessionError?.value || !session)
        return {
          data: null,
          error: {
            message: "Error creating file or checking session",
            value: true,
          },
        };

      const dataProtector = new IExecDataProtector(window.ethereum);

      const protectedDataList = await dataProtector.core.getProtectedData({
        owner: session.userAddress,
      });

      if (!protectedDataList) {
        return {
          data: [] as ProtectedData[],
          error: {
            message: "No protected data found",
            value: true,
          },
        };
      } else {
        return {
          data: protectedDataList,
          error: null,
        };
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Error fetching protected data",
          value: true,
        },
      };
    }
  };

  return { encryptAndPushData, getMyProtectedData };
};
