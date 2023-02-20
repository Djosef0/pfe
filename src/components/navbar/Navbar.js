import React,{useState,useContext} from 'react';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineShoppingCart  } from 'react-icons/ai';
import { BiNotification  } from 'react-icons/bi';
import "./navbar.css"
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NavbarSet() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerForm,setRegisterForm] = useState(false);
  const [msg , setMsg] = useState("vous n'avais pas de compte ?");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [photoP, setPhotoP]=useState(null)


  const { login } = useContext(AuthContext);
  const {logout} = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

  const handleLogin = async (event)=>{
    event.preventDefault();
    // window.location.reload(false);
    await login(email,password);
   }
   const handleLogout = async (event)=>{
    event.preventDefault();
    window.location.reload(false);
    await logout();
   }
 
  function FormRegister(){
    if(registerForm===false){
      setRegisterForm(true);
      setMsg("j'ai un compte")
    }
    else{
      setRegisterForm(false);
      setMsg("vous n'avais pas de compte ?")

    }
  }





const register = async(event)=>{
  event.preventDefault()

  try {
    const FormNew = new FormData()
    FormNew.append('name', name)
    FormNew.append('email', email)
    FormNew.append('password', password)
    FormNew.append('photoP', photoP)

    await axios.post("http://localhost:4000/api/users/register", FormNew )
    toast.success('compte creer avec succee')
  } catch (error) {
    console.error(error)
  }

}

function NotificationIcon() {
  return (
    <span style={{ position: 'relative', display: 'inline-block' , cursor : 'pointer' }}>
      <BiNotification />
      <span
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '16px',
          height: '16px',
          backgroundColor: 'red',
          borderRadius: '50%',
          color: 'white',
          textAlign: 'center',
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        2
      </span>
    </span>
  );
}




return (
<>
<ToastContainer
  position="top-center"
  reverseOrder={false}
/>
    <Navbar bg="light" expand="lg" className='Nav'>
    <Container>
      <Navbar.Brand href="/" >Gachar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <input type="button" className="btnForm"  value="recherche" />
          </Form>
          
        </Nav>
        <Nav 
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Femmes">Femmes</Nav.Link>
            <Nav.Link href="/Hommes">Hommes</Nav.Link>
            <Nav.Link href="/Enfants" >Enfants </Nav.Link>
            <Nav.Link href="/Maison" >Maison </Nav.Link>
            <Nav.Link href="/Electroniques" >Electroniques </Nav.Link>
            <Nav.Link href="/Animaux" >Animaux </Nav.Link>
          </Nav>
        <Nav >
          {
            currentUser  ? <div style={{display : "flex" , alignItem:"center"}}>
            <Nav.Link>{currentUser.user.name}</Nav.Link>
            <img src={currentUser.user.photoP.url} style={{height : "35px" , width:"35px" , borderRadius : "35%" }} alt="" />
            {NotificationIcon()}
            <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="menu"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/monprofile">Voir Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Deconnection</NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
            </div> : <Nav.Link onClick={handleShow}>s'authentifier/s'inscri</Nav.Link>
             }
            
          
          <Nav.Link eventKey={2} href="#memes" style={{marginLeft:"12px"}}>
         <AiOutlineShoppingCart  />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    
  </Navbar>
  <Modal show={show} onHide={handleClose}>
        
        <h2 closeButton>login</h2><hr />
        
        
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <button  className="btnForm" onClick={handleLogin}>s'authentifier</button>
  <br />
      
      <p onClick={FormRegister} >{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2>s'inscrire ici</h2><hr/>
  <Form.Group className='mb-3' controlId='formBasicFile1'>
      <Form.Label>Ajouter votre photo</Form.Label>
      <Form.Control type='file'id="img" name="img" onChange={(e) => setPhotoP(e.target.files[0])}></Form.Control> 
</Form.Group>
  <Form.Group className='mb-3' controlId='formBasicName1'>
      <Form.Label>Ajouter votre nom et prenom</Form.Label>
      <Form.Control type='text' placeholder='entrer votre nom et prenom' name="name" onChange={(e)=> setName(e.target.value)}></Form.Control> 

     </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>Ajouter votre adresse</Form.Label>
        <Form.Control type="email" placeholder="Entrer votre email" name="email"  onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>
      
     <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Ajouter votre mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <input  type="button" className="btnForm" onClick={register}  value="register"/>
      <br />
    </Form>
    
}

        </Modal.Body>
      </Modal>

      
</>
  
  );
}

export default NavbarSet;