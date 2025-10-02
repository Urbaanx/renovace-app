import { useState } from "react";
import Button from "../../components/Button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetUserHasRole,
  usePatchApiUsersUpdateMetadataClear,
  usePatchApiUsersUpdateMetadataDecorator,
} from "../../api/endpoints/api";
import { MoonLoader } from "react-spinners";

function FormDecorator() {
  const [lastCheckValue, setLastCheckValue] = useState<boolean>(false);
  const { user } = useAuth0();

  const { data: isDecoratorRole, isLoading: isLoadingDecoratorRole } =
    useGetUserHasRole({ role: "Decorator" });

  const updateMetaData = usePatchApiUsersUpdateMetadataDecorator();
  const clearMetaData = usePatchApiUsersUpdateMetadataClear();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    region: "",
    businessInfo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    region: "",
    telephone: "",
  });

  const handleClearMetaData = async () => {
    try {
      await clearMetaData.mutateAsync({
        params: { metadataType: "decorator" },
      });
    } catch (error) {
      console.error("Error clearing metadata:", error);
    }
  };

  const handleUpdateMetaData = async () => {
    try {
      updateMetaData.mutateAsync({
        data: {
          name: formData.name,
          surname: formData.surname,
          contactEmail: formData.email,
          contactPhone: formData.telephone,
          region: formData.region,
          description: formData.businessInfo,
        },
      });
    } catch (error) {
      console.error("Error updating metadata:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      (name === "imie" || name === "surname" || name === "region") &&
      /\d/.test(value)
    ) {
      return;
    }

    if (name === "telephone") {
      if (/[^0-9]/.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors: any = {};

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "Imię jest wymagane";
    } else if (/\d/.test(formData.name)) {
      formIsValid = false;
      newErrors.name = "Imię nie może zawierać cyfr";
    }

    if (!formData.surname) {
      formIsValid = false;
      newErrors.surname = "Nazwisko jest wymagane";
    } else if (/\d/.test(formData.surname)) {
      formIsValid = false;
      newErrors.surname = "Nazwisko nie może zawierać cyfr";
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = "E-mail jest wymagany";
    }

    if (!formData.region) {
      formIsValid = false;
      newErrors.region = "Region jest wymagany";
    } else if (/\d/.test(formData.region)) {
      formIsValid = false;
      newErrors.region = "Region nie może zawierać cyfr";
    }

    if (!formData.telephone) {
      formIsValid = false;
      newErrors.telephone = "Numer telefonu jest wymagany";
    }

    if (formData.telephone && !/^\d{9}$/.test(formData.telephone)) {
      formIsValid = false;
      newErrors.telephone = "Numer telefonu musi składać się z 9 cyfr";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
    }
  };

  return (
    <>
      {!isLoadingDecoratorRole ? (
        <div className="w-full max-w-lg text-backgroundComponents">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Uzupełnij poniższe dane:</h2>
            <span className="text-xs pt-2">* - pola obowiązkowe</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Imię:</label>
                <input
                  disabled={lastCheckValue}
                  type="text"
                  name="name"
                  placeholder="Jan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Nazwisko:</label>
                <input
                  disabled={lastCheckValue}
                  type="text"
                  name="surname"
                  placeholder="Kowalski"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs">{errors.surname}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">*E-mail kontaktowy:</label>
              <input
                disabled={lastCheckValue}
                type="email"
                name="email"
                placeholder="jkowalski@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Nr telefonu:</label>
                <input
                  disabled={lastCheckValue}
                  type="tel"
                  name="telephone"
                  placeholder="676 696 686"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-xs">{errors.telephone}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Region</label>
                <input
                  disabled={lastCheckValue}
                  type="text"
                  name="region"
                  placeholder="kujawsko-pomorskie"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.region && (
                  <p className="text-red-500 text-xs">{errors.region}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm mb-1 pt-2">
                Krótka informacja o Twojej działalności <br /> Co oferujesz,
                jakie masz doświadczenie?
              </label>
              <textarea
                disabled={lastCheckValue}
                name="businessInfo"
                placeholder="..."
                value={formData.businessInfo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-background bg-transparent shadow-md h-36"
              />
            </div>

            <p className="text-xs font-semibold pt-4">
              Twoje dane będą bezpieczne i wykorzystamy je tylko do celów
              współpracy.
            </p>
            {lastCheckValue ? (
              <>
                <p className=" font-semibold">
                  Czy na pewno wprowadzono dane poprawnie?
                </p>
                <div className="flex flex-row gap-10">
                  <stripe-buy-button
                    client-reference-id={user?.sub?.replace("|", "_")}
                    customer-email={formData.email}
                    buy-button-id="buy_btn_1RAaXWKbnNGg7WCfoqwZHRm2"
                    publishable-key="pk_test_51HaQr5KbnNGg7WCfK9TjfYNHdg34JJyTLEwjqvDFbwXVBtBMgfYkhcg7f0Fl502OUAXN33eL8mbq2X6QFaQLldLD00VF4zkdNV"
                  ></stripe-buy-button>
                  <Button
                    className="w-full h-11 bg-background text-mainColorText hover:text-brown hover:bg-[#4d4842] transition duration-200 p-2 shadow-lg rounded-lg"
                    onClick={() => {
                      setLastCheckValue(false);
                      handleClearMetaData();
                    }}
                  >
                    Cofnij
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="w-full bg-background text-mainColorText hover:text-brown hover:bg-[#4d4842] transition duration-200 p-2 shadow-lg rounded-lg disabled:bg-stone-500 disabled:hover:text-mainColorText"
                onClick={() => {
                  if (validateForm()) {
                    setLastCheckValue(true);
                    handleUpdateMetaData();
                  }
                }}
                disabled={!!isDecoratorRole}
              >
                {isDecoratorRole ? "Już posiadasz rolę Dekoratora" : " Dołącz"}
              </Button>
            )}
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex place-items-center place-content-center">
          <MoonLoader size={60} />
        </div>
      )}
    </>
  );
}

export default FormDecorator;
