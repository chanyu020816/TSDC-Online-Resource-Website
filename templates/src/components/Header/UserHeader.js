import React from 'react';
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { cx, css } from '@emotion/css/macro';
import { Button, Link, Box } from '@mui/material';
import DialogCreatePost from 'components/DialogCreatePost';
import logo from 'dist/image/logo.png';
import 'dist/scss/navbar.scss';

const page = [
  {
    name: '首頁',
    url: '/',
  },
  {
    name: '搜課程',
    url: '/search-course',
  },
  {
    name: '部落格',
    url: '/blog',
  }
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  height: "2rem",
  width: "100%",
  backgroundColor: 'rgb(66, 89, 137)',
  '&:hover': {
    backgroundColor: 'rgb(98, 119, 165)',
  },
}));

const UserHeader = (props) => {
  const [barClass, setBarClass] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { userInfo, asyncStatusUserInfo } = useSelector((store) => store.userInfo);

  React.useEffect(() => {
    console.log(userInfo);
  }, [userInfo])


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeBar = (index) => () => setBarClass(index);

  const userSignOut = () => {
    if (!isLogin) return

    localStorage.removeItem('YFCII_LOGGED_IN')
    localStorage.removeItem('YFCII_USER_ID')
    localStorage.removeItem('YFCII_USER_NAME')
  }

  React.useEffect(() => {
    setIsLogin(localStorage.getItem('YFCII_LOGGED_IN'))
  }, [])

  return (
    <div className={style(props.palette, isLogin)}>
      <header className="header">
        <div className="logo">
          <Link href="/" underline="none">
            <img src={logo} alt='YFCII' />
          </Link>
        </div>
        <nav className="navbar">
          <ul className={cx(barClass ? 'active' : '')}>
            {page.map((item, index) => (
              <li href="#" key={index}>
                <a href={item.url} >
                  {item.name}
                </a>
              </li>
            ))}
            {/* {isLogin ? (
              <li href="#">
                <a href="./userPlan" >
                  個人資訊
                </a>
              </li>
            ) : ("")} */}
            <li className="sm-login" >
              <a href={isLogin ? "./" : "./login"}
                onClick={userSignOut}>
                {isLogin ? "登出" : "登入"}
              </a>
            </li>
          </ul>
        </nav>
        <nav className="login">
          {isLogin ? (
            <Box pr={1}>
              <ColorButton variant="outlined" startIcon={<DriveFileRenameOutlineIcon />} onClick={handleClickOpen}>
                Write
              </ColorButton>
            </Box>
          ) : ("")}

          <ColorButton className={cx(barClass ? 'active' : '')} variant="contained" onClick={userSignOut}>
            <Link href={isLogin ? "./" : "./login"} underline="none" sx={{ color: "white" }}>
              {isLogin ? "登出" : "登入"}
            </Link>
          </ColorButton>
        </nav>
        <div className="menu-btn">
          {!barClass ? (
            <HiMenu className="menu-icon" onClick={handleChangeBar(true)} />
          ) : (
            <IoClose
              style={{ color: 'white' }}
              onClick={handleChangeBar(false)}
            />
          )}
        </div>
      </header>
      <DialogCreatePost open={open} setOpen={setOpen} handleClose={handleClose} />
    </div>
  );
};

export default UserHeader;

const style = (palette, isLogin) => css`
  .header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    color: ${palette.navbar.text.primary};
    background-color: ${palette.navbar.background};
    border-bottom: 1px solid #eeeeee;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
    z-index: 1000;

    .logo {
        padding: 10px 25px ;
        img{
            width: 130px;
        }
    }

    .navbar {
      padding: 10px 25px ;
      display: flex;
      align-items: center;
      ul {
        display: flex;
        list-style-type: none;
        justify-content: space-around;
        width: 100%;
        li a {
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 3px;
          color: ${palette.navbar.text.primary};
          margin: 1rem 1rem;
          font-size: 18px;
          font-weight: bold;
          transition: 0.3s ease;
          cursor: pointer;
          &:hover {
            color: ${palette.navbar.text.secondary};
          }
        }
        .sm-login{
            display: none;
        }
      }
    }

    .login{
        width:${isLogin ? `12rem` : `5rem`};
        padding: 10px 18px ;
        display: flex;
        align-items: center;
         /* .MuiButtonBase-root.button {
          height: 2rem;
          font-size: 16px;
          text-align: center;
          background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
          box-shadow: inset 0 0 0 0 ${palette.navbar.text.secondary} ;
          transition: all 0.5s;
          font-weight: bold;
          width: 90%;
          margin: 0 auto;
          a{
            color: white;
          }
          &:hover{
            transition: all 0.5s;
            transform: scale(1.1);
            box-shadow:inset -3.5em 0 0 0 ${palette.navbar.text.secondary}
            ,inset 3.5em 0 0 0 ${palette.navbar.text.secondary}; 
             
          }
        }  */
    }
  }

  .menu-btn {
    color: ${palette.dark};
    font-size: 23px;
    cursor: pointer;
    display: none;
    transition: 0.5s ease;
    &.active {
      color: white;
      transition: 0.5s ease;
    }
  }

  @media screen and (max-width: 768px) {
    .menu-btn {
      display: block;
      position: fixed;
      margin-top: -5px;
      right: 1rem;
      top: 1.5rem;
      z-index: 999;
      .menu-icon {
        margin: auto 0;
      }
    }

    .header {
      .navbar ul {
        z-index: 20;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        width: 100%;
        left: -100%;
        top: 0;
        background: #2d2c2c;
        text-align: center;
        transition: all 0.3s ease;
        &.active {
          left: 0;
        }
        .sm-login{
            display: block;
        }
        li {
          a {
            display: inline-block;
            margin: 20px 0;
            font-size: 25px;
            color: white;
          }
        }
      }

      .login{
        display: none;
      }
    }
  }
`;
