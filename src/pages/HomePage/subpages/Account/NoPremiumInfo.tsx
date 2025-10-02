import { Link } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import { useGetApiGetSubscriptionInfo } from "../../../../api/endpoints/api";
import formatDate from "../../../../components/DateFormater/formatDate";
import { MoonLoader } from "react-spinners";

interface NoPremiumInfoProps {
  isPremiumRole: boolean;
  isLoading: boolean;
}

export default function NoPremiumInfo({
  isPremiumRole,
  isLoading,
}: NoPremiumInfoProps) {
  const { data: subscriptionInfo, isLoading: subscriptionLoading } =
    useGetApiGetSubscriptionInfo();
  const subscriptionDate = subscriptionInfo?.renewalDate || undefined;
  let formatedSubscriptionDate;
  if (subscriptionDate !== undefined) {
    formatedSubscriptionDate = formatDate(subscriptionDate);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-32 bg-mainColorText lg:mx-16 mx-10 mt-8 rounded-xl place-items-center justify-around gap-3">
      <div className="flex flex-col lg:flex-row place-items-center lg:gap-3">
        <Logo width="100px" height="100px" />
        <p className="text-3xl xl:text-6xl font-bold text-background">
          Renovace+
        </p>
      </div>
      <div className="flex flex-col text-background text-lg gap-4 place-items-center justify-center mb-10 lg:mb-0 px-10">
        {!isLoading && !subscriptionLoading ? (
          <>
            <p>
              TWÓJ PAKIET RENOVACE+ JEST{" "}
              {isPremiumRole ? "AKTYWNY" : "NIEAKTYWNY"}!
            </p>
            {isPremiumRole ? (
              <p>Data następnej płatności: {formatedSubscriptionDate}</p>
            ) : (
              <Link to={`/premium-info`}>
                <p>Kliknij tutaj, aby zostać użytkownikiem Premium</p>
              </Link>
            )}
          </>
        ) : (
          <MoonLoader size={30} />
        )}
      </div>
    </div>
  );
}
