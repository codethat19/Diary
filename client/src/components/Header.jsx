import React, {useState} from "react";
// import HighlightIcon from "@material-ui/icons/Highlight";
// import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DescriptionIcon from "@material-ui/icons/Description";
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import DeletedNotes from "./DeletedNotes";
// import Navbar from "./navbar";
// import axios from "axios";
import { sidebarData } from "../sidebarData";
import "../navbar.css";

function Header() {
  
  // function handleClick(evt) {
  //   //viewDeletedNotes();
  //   const viewDeletedNotes = async (note) => {
  //     await axios.get('/deletedNotes')
  //       .then(res => {
  //         // console.log(res.data)
  //         props.setNotes(res.data);
  //       })
  //       .catch( error => {
  //         console.log(error);
  //       });
  //   // return (
  //   //   <DeletedNotes setNotes={props.setNotes} notes={props.notes}/>
  //   // )    
  //   }
  // }
  const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <div className="header">
      <h1>

        <FaIcons.FaBars onClick={showSidebar} style={{cursor:'pointer'}}/>  &nbsp;&nbsp;   
        {/* <DescriptionIcon style={{transform: "scale(1.5)"}}/>*/} <Link to='/view'>Diary</Link> 
        {/* <Link to='/deleted'><RestoreFromTrashIcon onClick={handleClick}/></Link> */}
      
      </h1>      
    </div>
    {/* <Navbar /> */}
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className="nav-menu-items">
        <li className="navbar-toggle">
          <Link to="/view" className="menu-bars">
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </Link>
        </li>
            {sidebarData.map((item, index) => {
                return(
                    <li key={index} className={item.cName} onClick={showSidebar}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    </li>
                )
            })}
            </ul>
        </nav>       
    </>
  );
}


export default Header;
