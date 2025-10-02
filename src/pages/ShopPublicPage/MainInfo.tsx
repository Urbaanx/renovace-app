import { motion } from "framer-motion";
import { useGetApiUsersShopId } from "../../api/endpoints/api";

interface ShopData {
  shopName?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  number?: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

interface MainInfoProps {
  id?: string;
}

function MainInfo({ id }: MainInfoProps) {
  const { data: shopData } = useGetApiUsersShopId<ShopData>(id || "");

  return (
    <div className="max-w-6xl mx-auto mt-24 p-6 rounded-xl text-background">
      <h1 className="text-center text-2xl font-semibold mb-10 py-10 bg-brownlight rounded-xl">
        Profil sklepu meblowego - {shopData?.shopName}
      </h1>

      <h1 className="text-background font-medium mb-6">Główne informacje</h1>

      <div className="flex justify-between flex-wrap gap-y-4 mb-6 text-sm">
        <div className="flex items-center">
          <span className="mr-2">📍</span>
          <span>
            Lokalizacja: {shopData?.city}, {shopData?.street} {shopData?.number}
          </span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">📞</span>
          <span>Kontakt: {shopData?.phone}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">📧</span>
          <span>
            E-mail:{" "}
            <a
              href={`mailto:${shopData?.email}`}
              className="text-blue-900 hover:underline ml-1"
            >
              {shopData?.email}
            </a>
          </span>
        </div>
      </div>

      <motion.hr
        className="my-4 w-full border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default MainInfo;
