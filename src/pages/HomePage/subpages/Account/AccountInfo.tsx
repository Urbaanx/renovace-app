import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "../../../../components/Sidebar/Sidebar";
import AccountData from "../Account/AccountData";
import NoPremiumInfo from "./NoPremiumInfo";
import { useGetUserHasRole } from "../../../../api/endpoints/api";
import { useEffect, useState } from "react";

interface AccountInfoProps {
  isMobile: boolean;
}

export default function AccountInfo({ isMobile }: AccountInfoProps) {
  const { user } = useAuth0();
  const connection = user?.sub?.split("|")[0];

  const { data: premiumRoleRequest, isLoading: loadingPremiumRole } =
    useGetUserHasRole({
      role: "PremiumUser",
    });

  const [isPremiumRole, setIsPremiumRole] = useState<boolean>(false);

  useEffect(() => {
    if (premiumRoleRequest) {
      setIsPremiumRole(true);
    } else {
      setIsPremiumRole(false);
    }
  }, [premiumRoleRequest]);

  return (
    <>
      <SideBar isMobile={isMobile} />
      <div className={`${!isMobile ? "ml-16" : "mb-16"}`}>
        <div className="w-full h-screen bg-background">
          <div className="flex  md:justify-start justify-center place-items-center md:pl-16 w-full h-24 bg-brownlight">
            <p className="text-4xl font-bold text-background">Moje konto</p>
          </div>
          <div className="bg-background">
            <NoPremiumInfo
              isPremiumRole={isPremiumRole}
              isLoading={loadingPremiumRole}
            />
          </div>
          <AccountData
            email={user?.email || ""}
            connection={connection || ""}
            isPremiumRole={isPremiumRole}
            setIsPremiumRole={setIsPremiumRole}
            isLoading={loadingPremiumRole}
          />
        </div>
      </div>
    </>
  );
}
