
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Container from "./Container";

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href="/dashboard">Invoicipedia</Link>
            </p>
            <span className="text-slate-300">/</span>
            <SignedIn>
              <span className="-ml-2">
                Signed in
                {/* <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" /> */}
              </span>
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
