import { motion } from "framer-motion";
import { useGetApiUsersDecoratorId } from "../../api/endpoints/api";

interface DecoratorData {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  description?: string;
  region?: string;
}

interface MainInfoProps {
  id?: string;
}

function MainInfo({ id }: MainInfoProps) {
  const { data: decoratorData } = useGetApiUsersDecoratorId<DecoratorData>(
    id || ""
  );

  return (
    <div className="max-w-6xl mx-auto mt-24 p-6 rounded-xl text-background">
      <h1 className="text-center text-2xl font-semibold mb-10 py-10 bg-brownlight rounded-xl">
        Profil Dekoratora wnętrz - {decoratorData?.name}{" "}
        {decoratorData?.surname}
      </h1>

      <h1 className="text-background font-medium mb-6">Główne informacje</h1>

      <div className="flex justify-between flex-wrap gap-y-4 text-sm">
        <div className="flex items-center">
          <span className="mr-2">📍</span>
          <span>Region: {decoratorData?.region}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📞</span>
          <span>Kontakt: {decoratorData?.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          <span>
            E-mail:{" "}
            <a
              href={`mailto:${decoratorData?.email}`}
              className="text-blue-900 hover:underline ml-1"
            >
              {decoratorData?.email}
            </a>
          </span>
        </div>
      </div>

      <div className="text-sm mb-10">
        <h1 className="font-medium mb-6 pt-10 text-base">O sobie:</h1>
        <p>{decoratorData?.description}</p>
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
