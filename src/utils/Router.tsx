import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import HomePage from "../pages/HomePage/subpages/Home/HomePage";
import AccountInfo from "../pages/HomePage/subpages/Account/AccountInfo";
import AuthGuard from "../components/Auth0/AuthGuard";
import { QueryClient, QueryClientProvider } from "react-query";
import RenovationViewer from "../pages/Viewer/RenovationViewer";
import RoomViewer from "../pages/Viewer/RoomViewer";
import FurnitureViewer from "../pages/Viewer/FurnitureViewer";
import { useEffect } from "react";
import { useState } from "react";
import RenovationsAndScans from "../pages/HomePage/subpages/Rooms/Rooms";
import NotFound404 from "../pages/NotFound404/NotFound404";
import Renovations from "../pages/HomePage/subpages/Renovations/Renovations";
import Furniture from "../pages/HomePage/subpages/Furniture/Furniture";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminRoomsPage from "../pages/AdminPage/AdminRoomsPage";
import AdminRoomsInRenovations from "../pages/AdminPage/AdminRoomsInRenovations";
import AdminObjectsPage from "../pages/AdminPage/AdminObjectsPage";
import AdminObjectsInRenovations from "../pages/AdminPage/AdminObjectsInRenovations";
import AdminRenovationPermissionsPage from "../pages/AdminPage/AdminRenovationPermissionsPage";
import AdminObjectPermissionPage from "../pages/AdminPage/AdminObjectPermissionsPage";
import AdminRenovationsPage from "../pages/AdminPage/AdminRenovationsPage";
import AdminConfigPage from "../pages/AdminPage/AdminConfigPage";
import AdminRoomPermissionPage from "../pages/AdminPage/AdminRoomPermissionsPage";
import AdminGuard from "../pages/AdminPage/AdminGuard";
import Portal from "../pages/PortalPage/Portal";
import PremiumInfoPage from "../pages/PremiumInfoPage/PremiumInfoPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import Form from "../pages/Form/Form";
import PortalFurniture from "../pages/PortalFurniture/PortalFurniture";
import PortalRenovations from "../pages/PortalRenovations/PortalRenovations";
import Tutorial from "../pages/Tutorial/Tutorial";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import WhatIsGS from "../pages/WhatIsGS/WhatIsGS";
import PublicRenovationViewer from "../pages/Viewer/PublicViewer/PublicRenovationViewer";
import PublicFurnitureViewer from "../pages/Viewer/PublicViewer/PublicFurnitureViewer";
import DecoratorPublicPage from "../pages/DecoratorPublicPage/DecoratorPublicPage";
import ShopPublicPage from "../pages/ShopPublicPage/ShopPublicPage";
import HomePageDecoratorShop from "../pages/HomePageDecoratorShop/subpages/HomePage/HomePageDecoratorShop";
import Profile from "../pages/HomePageDecoratorShop/subpages/Profile/Profile";
import FurnitureShop from "../pages/HomePageDecoratorShop/Furniture/FurnitureShop";
import RenovationsDecorator from "../pages/HomePageDecoratorShop/Renovations/RenovationsDecorator";

export default function Router() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 || window.innerHeight < 500
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage isMobile={isMobile} />} />
        {/* Check Authorization Element*/}
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/furniture" element={<PortalFurniture />} />
        <Route path="/portal/renovations" element={<PortalRenovations />} />

        <Route element={<AuthGuard />}>
          <Route path="portal/business" element={<Form />} />
        </Route>

        <Route
          path="/portal/decorator/:author"
          element={<DecoratorPublicPage />}
        />
        <Route path="/portal/shop/:shop" element={<ShopPublicPage />} />

        {/*Footer */}
        <Route path="/what-is-gs" element={<WhatIsGS />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/portal/renovations/:id"
          element={<PublicRenovationViewer isMobile={isMobile} />}
        />
        <Route
          path="/portal/furniture/:id"
          element={<PublicFurnitureViewer isMobile={isMobile} />}
        />

        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<HomePage isMobile={isMobile} />} />
          <Route
            path="/account"
            element={<AccountInfo isMobile={isMobile} />}
          />
          <Route
            path="/renovations"
            element={<Renovations isMobile={isMobile} />}
          />
          <Route
            path="/furniture"
            element={<Furniture isMobile={isMobile} />}
          />
          <Route
            path="/rooms"
            element={<RenovationsAndScans isMobile={isMobile} />}
          />
          <Route path="/premium-info" element={<PremiumInfoPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/room" element={<AdminRoomsPage />} />
            <Route
              path="/admin/renovation"
              element={<AdminRenovationsPage />}
            />
            <Route path="/admin/object" element={<AdminObjectsPage />} />
            <Route
              path="/admin/object-permissions"
              element={<AdminObjectPermissionPage />}
            />
            <Route
              path="/admin/renovation-permissions"
              element={<AdminRenovationPermissionsPage />}
            />
            <Route
              path="/admin/room-permissions"
              element={<AdminRoomPermissionPage />}
            />

            <Route
              path="/admin/objects-in-renovations"
              element={<AdminObjectsInRenovations />}
            />
            <Route
              path="/admin/rooms-in-renovations"
              element={<AdminRoomsInRenovations />}
            />
            <Route path="/admin/config" element={<AdminConfigPage />} />
          </Route>
          <Route
            path="/renovations/:id"
            element={<RenovationViewer isMobile={isMobile} />}
          />

          <Route
            path="rooms/:id"
            element={<RoomViewer isMobile={isMobile} />}
          />
          <Route
            path="furniture/:id"
            element={<FurnitureViewer isMobile={isMobile} />}
          />
          {/* Home For Decorators And Shops */}
          <Route
            path="/portal/decorator-shop/dashboard"
            element={<HomePageDecoratorShop isMobile={isMobile} />}
          />
          <Route
            path="/portal/decorator-shop/profile"
            element={<Profile isMobile={isMobile} />}
          />
          <Route
            path="/portal/decorator-shop/furniture"
            element={<FurnitureShop isMobile={isMobile} />}
          />
          <Route
            path="/portal/decorator-shop/renovations"
            element={<RenovationsDecorator isMobile={isMobile} />}
          />
        </Route>
        {/* Page Not Found */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </QueryClientProvider>
  );
}
