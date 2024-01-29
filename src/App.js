import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forgotpassword from './pages/welcome/Forgotpassword';
import Home from './pages/home/Home';
import Home2 from './pages/home/Home2';
import Login from './pages/welcome/login';
import MyProfile from './pages/customer/MyProfile';
import Otp from './pages/welcome/Otp';
import ResendOtp from './pages/welcome/ResendOTP';
import Register from './pages/welcome/Register';
import Support from './pages/support/Support';
import UnlockOTP from './pages/modal/UnlockOTP';
import Welcome from './pages/welcome/Welcome';
import VisitorPage from './pages/welcome/VisitorPage';
import Inbox from './pages/inbox/Inbox';
import Myorder from './pages/order/Myorder';
import WashingStepOne from './pages/TypeOfService/WashingStepOne';
import PickupSchedule from './pages/order/PickupSchedule';
import OrderDetails from './pages/order/OrderDetails';
import UpdateOrderDetails from './pages/order/UpdateOrderDetails';
import OrderPlaced from './pages/order/OrderPlaced';
import UnlockMessage from './pages/modal/UnlockMessage';
import LoadingLocker from './pages/modal/LoadingLocker';
import SuccessUnlock from './pages/modal/SuccessUnlock';
import InboxDetails from './pages/inbox/InboxDetails';
import OrderConfirmation from './pages/modal/OrderConfirmation';
import OrderCompleted from './pages/order/OrderCompleted';
import UploadPhoto from './pages/TypeOfService/UploadPhoto';
import DriverLogin from './pages/driver/DriverLogin';
import DriverHome from './pages/driver/DriverHome';
import DriverRecords from './pages/driver/DriverRecords';
import DriverWelcome from './pages/driver/DriverWelcome';
import DriverLoadingLocker from './pages/driver/LoadingLocker';
import DriverUnlockMessage from './pages/driver/UnlockMessage';
import DriverSuccess from './pages/driver/SuccessPage';
import DriverForgotPassword from './pages/driver/DriverForgotPassword';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import OrderManagement from './pages/admin/OrderManagement';
import EnquiryManagement from './pages/admin/EnquiryManagement';
import LockerStatus from './pages/admin/LockerStatus';
import UserPerformance from './pages/admin/UserPerformance';
import SalesOverview from './pages/admin/SalesOverview';
import ServiceManagement from './pages/admin/ServiceManagement';
import OperatorManagement from './pages/admin/OperatorManagement';
import ForgotOtp from './pages/welcome/ForgotOtp';
import ResetNewPassword from './pages/welcome/ResetNewPassword';
import CreateOperator from './pages/admin/CreateOperator';
import LockerDetails from './pages/admin/LockerDetails';
import LockerConfirmation from './pages/driver/LockerConfirmation';
import CreateFabric from './pages/admin/CreateFabric';
import Charges from './pages/admin/Charges';
import ChargesManagement from './pages/admin/ChargesManagement';
import Location from './pages/home/Location';
import RescheduleManagement from './pages/admin/RescheduleManagement';
import MDRManagement from './pages/admin/Reports/MDRManagement';
import PaymentReport from './pages/admin/Reports/PaymentReport';
import ItemReport from './pages/admin/Reports/ItemReport';
import CategoryReport from './pages/admin/Reports/CategoryReport';
import SalesSummaryReport from './pages/admin/Reports/SalesSummaryReport';
import AdminManagement from './pages/admin/User/AdminManagement';
import SMSManagement from './pages/admin/User/SMSManagement';
import RefundReport from './pages/admin/Reports/RefundReport';
import DiscountManagement from './pages/admin/DiscountManagement';
import { verifyToken } from './redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { admin } = useSelector((state) => state.adminReducer);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const adminToken = localStorage.getItem('adminToken')

  useEffect(() => {
    if (roles && roles.length && adminToken && window.location.pathname.includes('admin')) {
      console.log('admin check')
      dispatch(verifyToken({ token: adminToken }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (admin && window.location.pathname.includes('admin')) {
      let roles = admin && admin.roles
      setRoles(roles);
    }
  }, [admin])

  const checkRoles = (type) => {
    if (roles && roles.length) {
      let checkStatus = roles.filter(a => a.name === type)[0]
      if (checkStatus) {
        return checkStatus.status
      } else {
        console.log('role status not found')
      }
    }
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <BrowserRouter>
        {!window.location.pathname.includes('admin') ? (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid lightgrey',
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative',
            minHeight: '100vh'
          }}>
            <Routes>
              <Route exact path="/customer/welcome" element={<VisitorPage />} />
              <Route exact path="/customer/login" element={<Login />} />
              <Route exact path="/customer/forgot-password" element={<Forgotpassword />} />
              <Route exact path="/customer/unlock-Locker" element={<UnlockOTP />} />
              <Route exact path="/customer/register" element={<Register />} />
              <Route exact path="/customer/otp/verify/:phone_number" element={<Otp />} />
              <Route exact path="/customer/resendotp" element={<ResendOtp />} />
              <Route exact path="/customer/home" element={<Home />} />
              <Route exact path="/customer/home2" element={<Home2 />} />
              <Route exact path="/customer/support" element={<Support />} />
              <Route exact path="/customer/myprofile" element={<MyProfile />} />
              <Route exact path="/customer/inbox" element={<Inbox />} />
              <Route exact path="/customer/inboxdetails" element={<InboxDetails />} />
              <Route exact path="/customer/myorder" element={<Myorder />} />
              <Route exact path="/customer/location" element={<Location />} />
              <Route exact path="/customer/washing/stepone" element={<WashingStepOne />} />
              <Route exact path="/customer/pickupschedule" element={<PickupSchedule />} />
              <Route exact path="/customer/order-details" element={<OrderDetails />} />
              <Route exact path="/customer/order-details/update" element={<UpdateOrderDetails />} />
              <Route exact path="/customer/unlock-message" element={<UnlockMessage />} />
              <Route exact path="/customer/order-confirmation" element={<OrderConfirmation />} />
              <Route exact path="/customer/loadinglocker" element={<LoadingLocker />} />
              <Route exact path="/customer/uploadphoto" element={<UploadPhoto />} />
              <Route exact path="/customer/order-placed" element={<OrderPlaced />} />
              <Route exact path="/customer/order-completed" element={<OrderCompleted />} />
              <Route exact path="/customer/success-unlock" element={<SuccessUnlock />} />
              <Route exact path="/driver/login" element={<DriverLogin />} />
              <Route exact path="/driver/home" element={<DriverHome />} />
              <Route exact path="/driver/welcome" element={<DriverWelcome />} />
              <Route exact path="/driver/record" element={<DriverRecords />} />
              <Route exact path="/driver/forgotpassword" element={<DriverForgotPassword />} />
              <Route exact path="/driver/locker/confirmation" element={<LockerConfirmation />} />
              <Route exact path="/driver/loadinglocker" element={<DriverLoadingLocker />} />
              <Route exact path="/driver/unlock" element={<DriverUnlockMessage />} />
              <Route exact path="/driver/success" element={<DriverSuccess />} />
              <Route exact path="/customer/forgot-password/verify" element={<ForgotOtp />} />
              <Route exact path="/customer/forgot-password/reset-password" element={<ResetNewPassword />} />
              <Route exact path="/" element={<VisitorPage />} />
            </Routes>
          </div>)
          : null}

        {/* admin */}

        {window.location.pathname.includes('admin') ? (
          <div style={{
            backgroundColor: 'white',
          }}>
            <Routes>
              <Route
                exact
                path="/admin/operator/create"
                element={checkRoles('CreateDriver') || (admin && admin.name === 'admin') ? <CreateOperator /> : <AdminHome />} />
              <Route
                exact
                path="/admin/fabric/create"
                element={checkRoles('CreateItemType') || (admin && admin.name === 'admin') ? <CreateFabric /> : <AdminHome />} />
              <Route
                exact
                path="/admin/locker/details"
                element={<LockerDetails />}
              />
              <Route exact path="/admin/login" element={<AdminLogin />} />
              <Route exact path="/admin/home" element={<AdminHome />} />
              <Route
                exact
                path="/admin/order/management"
                element={checkRoles('OrderManagement') || (admin && admin.name === 'admin') ? <OrderManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/enquiry/management"
                element={checkRoles('EnquireManagement') || (admin && admin.name === 'admin') ? <EnquiryManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/charges/management"
                element={checkRoles('ChargesManagement') || (admin && admin.name === 'admin') ? <ChargesManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/lockerstatus"
                element={checkRoles('LockerStatus') || (admin && admin.name === 'admin') ? <LockerStatus /> : <AdminHome />} />
              <Route
                exact
                path="/admin/user/performance"
                element={checkRoles('UserPerformance') || (admin && admin.name === 'admin') ? <UserPerformance /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/sales/overview"
                element={checkRoles('SalesOverview') || (admin && admin.name === 'admin') ? <SalesOverview /> : <AdminHome />} />
              <Route
                exact
                path="/admin/servicetype/update"
                element={checkRoles('ItemTypeManagement') || (admin && admin.name === 'admin') ? <ServiceManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/operator/update"
                element={checkRoles('DriverManagement') || (admin && admin.name === 'admin') ? <OperatorManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/order/charges"
                element={checkRoles('CreateCharges') || (admin && admin.name === 'admin') ? <Charges /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/order/reschedule"
                element={checkRoles('RescheduleManagement') || (admin && admin.name === 'admin') ? <RescheduleManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/mdr/management"
                element={checkRoles('MDRManagement') || (admin && admin.name === 'admin') ? <MDRManagement /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/discountManagement"
                element={checkRoles('DiscountManagement') || (admin && admin.name === 'admin') ? <DiscountManagement /> : <AdminHome />}
              />
              {/* ............Report.................... */}
              <Route
                exact
                path="/admin/report/payment"
                element={checkRoles('PaymentMethodReport') || (admin && admin.name === 'admin') ? <PaymentReport /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/report/itemtype"
                element={checkRoles('ItemTypeReport') || (admin && admin.name === 'admin') ? <ItemReport /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/report/category"
                element={checkRoles('CategoryReport') || (admin && admin.name === 'admin') ? <CategoryReport /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/report/sales"
                element={checkRoles('SalesSummaryReport') || (admin && admin.name === 'admin') ? <SalesSummaryReport /> : <AdminHome />}
              />
              <Route
                exact
                path="/admin/user/management"
                element={<AdminManagement />}
              />
              <Route
                exact
                path="/admin/sms/management"
                element={<SMSManagement />}
              />
              <Route
                exact
                path="/admin/report/refund"
                element={checkRoles('RefundReport') || (admin && admin.name === 'admin') ? <RefundReport /> : <AdminHome />}
              />
              <Route exact path="/" element={<Welcome />} />
            </Routes>
          </div>
        )
          : null}
      </BrowserRouter>
    </div>
  );
}

export default App;
