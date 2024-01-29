import React, { useState, useEffect } from 'react';
import {
  ListItem,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MessageIcon from '@mui/icons-material/Message';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { verifyToken } from '../../../redux/actions/adminActions';


import './index.css';
function SideBar({ openDrawer, changeDrawerState }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openPackage, setOpenPackage] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const { admin } = useSelector((state) => state.adminReducer);

  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken')
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const handlePackage = () => {
    setOpenPackage(!openPackage);
  };
  const handleReport = () => {
    setOpenReport(!openReport);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate("/admin/login")

  }
  let roles = admin && admin.roles

  const checkTab = (tab) => {
    let checkStatus = roles && roles.filter(a => a.category === tab && a.status === true)[0]
    // console.log(checkStatus, tab, admin)
    return checkStatus
  }
  const checkRoles = (type) => {
    let checkStatus = roles && roles.filter(a => a.name === type)[0]?.status
    return checkStatus
  }
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={changeDrawerState}>
        <List>
         <ListItemButton onClick={handleClick}>
            <ListItemText className="admin-list-item">Home</ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
             <ListItem component={Link} to="/admin/lockerstatus">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Locker Status
                </ListItemText>
              </ListItemButton>
            </ListItem> 
         <ListItem component={Link} to="/admin/order/management">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <FindInPageIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Order Management
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem component={Link} to="/admin/sales/overview">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Sales Overview
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem component={Link} to="/admin/enquiry/management">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Enquire Management
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem component={Link} to="/admin/user/performance">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  User Performance
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem component={Link} to="/admin/order/charges">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Create Charges
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            {checkRoles('ChargesManagement') || (admin && admin.name === 'admin') ? <ListItem component={Link} to="/admin/charges/management">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Charges Management
                </ListItemText>
              </ListItemButton>
            </ListItem> : ''}
            <ListItem component={Link} to="/admin/discountManagement">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <DiscountIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Discount Management
                </ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem component={Link} to="/admin/order/reschedule">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <ManageHistoryIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  Reschedule Management
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Collapse>
         <ListItemButton onClick={handlePackage}>
            <ListItemText className="admin-list-item">
              Package Customization
            </ListItemText>

            {openPackage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton> 
          <Collapse in={openPackage} timeout="auto" unmountOnExit>
            <List>
             <ListItem component={Link} to="/admin/operator/create">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Create Driver
                  </ListItemText>
                </ListItemButton>
              </ListItem> 
               <ListItem component={Link} to="/admin/fabric/create">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Create Item Type
                  </ListItemText>
                </ListItemButton>
              </ListItem> 
               <ListItem component={Link} to="/admin/operator/update">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Driver Management
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem component={Link} to="/admin/servicetype/update">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <LocalLaundryServiceIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Item Type Management
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

       <ListItemButton onClick={handleReport}>
            <ListItemText className="admin-list-item">
              Reports
            </ListItemText>

            {openReport ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton> 
          <Collapse in={openReport} timeout="auto" unmountOnExit>
            <List>
         <ListItem component={Link} to="/admin/mdr/management">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    MDR Management
                  </ListItemText>
                </ListItemButton>
              </ListItem> 
              <ListItem component={Link} to="/admin/report/category">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Category Report
                  </ListItemText>
                </ListItemButton>
              </ListItem> 
              {checkRoles('ItemTypeReport') || (admin && admin.name === 'admin') ? <ListItem component={Link} to="/admin/report/itemtype">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Item Type Report
                  </ListItemText>
                </ListItemButton>
              </ListItem> : ''}
              {checkRoles('PaymentMethodReport') || (admin && admin.name === 'admin') ? <ListItem component={Link} to="/admin/report/payment">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <PaidIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Payment Method Report
                  </ListItemText>
                </ListItemButton>
              </ListItem> : ''}
              {checkRoles('SalesSummaryReport') || (admin && admin.name === 'admin') ? <ListItem component={Link} to="/admin/report/sales">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Sales Summary Report
                  </ListItemText>
                </ListItemButton>
              </ListItem> : ''}
              {checkRoles('RefundReport') || (admin && admin.name === 'admin') ? <ListItem component={Link} to="/admin/report/refund">
                <ListItemButton onClick={changeDrawerState}>
                  <ListItemIcon>
                    <PaidIcon />
                  </ListItemIcon>
                  <ListItemText className="admin-list-item">
                    Refund Report
                  </ListItemText>
                </ListItemButton>
              </ListItem> : ''}

            </List>
          </Collapse>


          {admin && admin.name === 'admin' ? <><ListItem component={Link} to="/admin/user/management">
            <ListItemButton onClick={changeDrawerState}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText className="admin-list-item">
                User Management
              </ListItemText>
            </ListItemButton>
          </ListItem>
            <ListItem component={Link} to="/admin/sms/management">
              <ListItemButton onClick={changeDrawerState}>
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText className="admin-list-item">
                  SMS Management
                </ListItemText>
              </ListItemButton>
            </ListItem></>
            : ''}

          <ListItem onClick={logout}>
            <ListItemButton onClick={changeDrawerState}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText className="admin-list-item">Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
