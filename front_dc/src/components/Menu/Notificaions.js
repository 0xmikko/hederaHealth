import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    FormControl,
    } from 'react-bootstrap';
    
export class Notifications extends React.Component{
    render(){
        return(
        <NavDropdown eventKey={3} title={
            <span>
                    <i className="md md-notifications"></i>
                    <span className="badge badge-xs badge-danger">3
                    </span></span>} id="basic-nav-dropdown" noCaret>
                <MenuItem eventKey={3.1} href='wallte/'>
                <div className="media-body clearfix">
                        <div className="media-heading">New user registered</div>
                        <p className="m-0">
                           <small>You have 10 unread messages</small>
                        </p>
                     </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}><div className="media">
                     <div className="media-left">
                        <em className="fa fa-diamond fa-2x text-primary"></em>
                     </div>
                     <div className="media-body clearfix">
                        <div className="media-heading">New settings</div>
                        <p className="m-0">
                           <small>There are new settings available</small>
                        </p>
                     </div>
                  </div></MenuItem>

            </NavDropdown>
        
       /* <li class="dropdown hidden-xs">
        <a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
            <i class="md md-notifications"></i><span class="badge badge-xs badge-danger">3</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-lg">
            <li class="text-center notifi-title">Notification</li>
            <li class="list-group">
             
               <a href="javascript:void(0);" class="list-group-item">
                  <div class="media">
                     <div class="media-left">
                        <em class="fa fa-user-plus fa-2x text-info"></em>
                     </div>
                     <div class="media-body clearfix">
                        <div class="media-heading">New user registered</div>
                        <p class="m-0">
                           <small>You have 10 unread messages</small>
                        </p>
                     </div>
                  </div>
               </a>
          
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="media">
                     <div class="media-left">
                        <em class="fa fa-diamond fa-2x text-primary"></em>
                     </div>
                     <div class="media-body clearfix">
                        <div class="media-heading">New settings</div>
                        <p class="m-0">
                           <small>There are new settings available</small>
                        </p>
                     </div>
                  </div>
                </a>
                
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="media">
                     <div class="media-left">
                        <em class="fa fa-bell-o fa-2x text-danger"></em>
                     </div>
                     <div class="media-body clearfix">
                        <div class="media-heading">Updates</div>
                        <p class="m-0">
                           <small>There are
                              <span class="text-primary">2</span> new updates available</small>
                        </p>
                     </div>
                  </div>
                </a>
            
                <a href="javascript:void(0);" class="list-group-item">
                  <small>See all notifications</small>
                </a>
            </li>
        </ul>
    </li>*/
        );
    }
}

export default Notifications;