import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "@/components/auth/user-auth-form";
import FlickeringGrid from "@/components/ui/flickering-grid";
import HyperText from "@/components/ui/hyper-text";
import Meteors from "@/components/ui/meteors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Login() {
  return (
    <div className="container relative min-h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute z-20 inset-0 bg-secondary" />
        <Meteors number={60} />

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src={"https://www.ethrome.org/img/aboveFold/ethRomeLogo_aboveFold.svg"}
            width={40}
            height={40}
            alt="EthRome Logo"
          />
          <span className="ml-2">EthRome2024</span>
        </div>
        <div className="relative z-20 mt-auto"></div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image
              src={"https://www.ethrome.org/img/aboveFold/ethRomeLogo_aboveFold.svg"}
              width={130}
              height={130}
              className="mb-4"
              alt="EthRome Logo"
            />
            <HyperText className="text-2xl font-semibold tracking-tight" text="Welcome to EthRome2024" />
            {/* <HyperText className="text-sm text-muted-foreground my-0 py-0" text="Connect your wallet to get started." /> */}
            {/* <p className="text-sm text-muted-foreground">Connect your wallet to get started.</p> */}
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
