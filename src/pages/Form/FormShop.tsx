import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetUserHasRole,
  usePatchApiUsersUpdateMetadataClear,
  usePatchApiUsersUpdateMetadataShop,
} from "../../api/endpoints/api";
import { MoonLoader } from "react-spinners";

function FormShop() {
  const [lastCheckValue, setLastCheckValue] = useState<boolean>(false);
  const { user } = useAuth0();
  const { data: isShopRole, isLoading: isLoadingShopRole } = useGetUserHasRole({
    role: "Shop",
  });

  const updateMetaData = usePatchApiUsersUpdateMetadataShop();
  const clearMetaData = usePatchApiUsersUpdateMetadataClear();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    shopName: "",
    street: "",
    streetNumber: "",
    city: "",
    postCode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    shopName: "",
    street: "",
    streetNumber: "",
    city: "",
    postCode: "",
  });

  interface FormData {
    name: string;
    surname: string;
    email: string;
    telephone: string;
    shopName: string;
    street: string;
    streetNumber: string;
    city: string;
    postCode: string;
  }

  interface FormErrors {
    name: string;
    surname: string;
    email: string;
    telephone: string;
    shopName: string;
    street: string;
    streetNumber: string;
    city: string;
    postCode: string;
  }

  const handleUpdateMetaData = async () => {
    try {
      updateMetaData.mutateAsync({
        data: {
          name: formData.name,
          surname: formData.surname,
          contactEmail: formData.email,
          contactPhone: formData.telephone,
          shopName: formData.shopName,
          street: formData.street,
          number: formData.streetNumber,
          city: formData.city,
          code: formData.postCode,
        },
      });
    } catch (error) {
      console.error("Error updating metadata:", error);
    }
  };

  const handleClearMetaData = async () => {
    try {
      await clearMetaData.mutateAsync({
        params: { metadataType: "shop" },
      });
    } catch (error) {
      console.error("Error clearing metadata:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "telephone") {
      if (!/^\d{0,9}$/.test(value)) return;
    }

    if (name === "streetNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    if (name === "name" || name === "surname") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]*$/.test(value)) return;
    }

    if (name === "street") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]*$/.test(value)) return;
    }

    if (name === "city") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]*$/.test(value)) return;
    }

    if (name === "postCode") {
      if (!/^\d{0,2}-?\d{0,3}$/.test(value)) return;
    }

    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors: FormErrors = {
      name: "",
      surname: "",
      email: "",
      telephone: "",
      shopName: "",
      street: "",
      streetNumber: "",
      city: "",
      postCode: "",
    };
    let isValid: boolean = true;

    if (!formData.name) {
      formErrors.name = "Imię jest wymagane";
      isValid = false;
    }
    if (!formData.surname) {
      formErrors.surname = "Nazwisko jest wymagane";
      isValid = false;
    }
    if (!formData.email) {
      formErrors.email = "E-mail kontaktowy jest wymagany";
      isValid = false;
    }
    if (!formData.shopName) {
      formErrors.shopName = "Nazwa sklepu jest wymagana";
      isValid = false;
    }
    if (!formData.streetNumber) {
      formErrors.streetNumber = "Numer Ulicy jest wymagany";
      isValid = false;
    }
    if (!formData.street) {
      formErrors.street = "Ulica jest wymagana";
      isValid = false;
    }
    if (!formData.city) {
      formErrors.city = "Miejscowość jest wymagana";
      isValid = false;
    }
    if (!formData.postCode) {
      formErrors.postCode = "Kod pocztowy jest wymagany";
      isValid = false;
    }

    if (!formData.telephone) {
      formErrors.telephone = "Numer telefonu jest wymagany";
      isValid = false;
    }

    if (formData.telephone && formData.telephone.length !== 9) {
      formErrors.telephone = "Numer telefonu musi składać się z 9 cyfr";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
    }
  };

  return (
    <>
      {!isLoadingShopRole ? (
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
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jan"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">{errors.name}</span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Nazwisko:</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Kowalski"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.surname && (
                  <span className="text-red-500 text-xs">{errors.surname}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">*E-mail kontaktowy:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jkowalski@gmail.com"
                className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">Nr telefonu:</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="676 696 686"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.telephone && (
                  <span className="text-red-500 text-xs">
                    {errors.telephone}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Nazwa sklepu:</label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="U Zdzisia"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.shopName && (
                  <span className="text-red-500 text-xs">
                    {errors.shopName}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm font-semibold">Adres sklepu:</p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <label className="block text-sm mb-1">*Ulica:</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Lubicka"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.street && (
                  <span className="text-red-500 text-xs">{errors.street}</span>
                )}
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-sm mb-1">*Number:</label>
                <input
                  type="text"
                  name="streetNumber"
                  value={formData.streetNumber}
                  onChange={handleChange}
                  placeholder="31"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.streetNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.streetNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Miejscowość:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Toruń"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.city && (
                  <span className="text-red-500 text-xs">{errors.city}</span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm mb-1">*Kod pocztowy:</label>
                <input
                  type="text"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                  placeholder="87-400"
                  className="w-full p-2 border rounded-md border-background bg-transparent shadow-md"
                />
                {errors.postCode && (
                  <span className="text-red-500 text-xs">
                    {errors.postCode}
                  </span>
                )}
              </div>
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
                    buy-button-id="buy_btn_1RAaF0KbnNGg7WCfHE7TVhfa"
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
                disabled={!!isShopRole}
              >
                {isShopRole ? "Już posiadasz rolę Sklepu" : " Dołącz"}
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

export default FormShop;
