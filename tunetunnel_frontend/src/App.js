import './App.css';
import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/LoginComponent';
import SignupComponent from './routes/SignupComponent';
import HomeComponent from './components/shared/HomeComponent';
import { useCookies } from 'react-cookie';
import LoggedInhome from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import songContext from './contexts/songContext';
import { useState } from 'react';
import SearchPage from './routes/SearchPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Library from './routes/Library';
import SinglePlaylistView from './routes/SinglePlaylistView';

// ProtectedRoute component to handle route guarding based on authentication
// const ProtectedRoute = ({ cookie, children }) => {
//   return cookie ? children : <Navigate to="/login" />;
// };

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookies, setCookie] = useCookies(['token']);
  const [songPlayed, setSongPlayed] = useState(null);
  const [isPaused, setPaused] = useState(true);
  const cookie = cookies?.token;

  return (
    <div className="w-full h-full font-poppins">
      <BrowserRouter>
      <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
      {cookie?(
                // {/* ToastContainer for global toast notifications */}

      
              <songContext.Provider value={{ currentSong, setCurrentSong, songPlayed, isPaused, setSongPlayed, setPaused }}>
                <Routes>
                  {/* Default route based on authentication state */}
                  <Route path="/" element={<Navigate to={cookie ? '/home' : '/login'} />} />
      
                  {/* Protected Routes for logged-in users */}
                  <Route
                    path="/home"
                    element={
                      // <ProtectedRoute cookie={cookie}>
                        <LoggedInhome />
                     // {/* </ProtectedRoute> */}
                    }
                  />
                  <Route
                    path="/uploadsong"
                    element={
                      // <ProtectedRoute cookie={cookie}>
                        <UploadSong />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/mymusic"
                    element={
                      // <ProtectedRoute cookie={cookie}>
                        <MyMusic />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      // <ProtectedRoute cookie={cookie}>
                        <SearchPage />
                      //</ProtectedRoute>
                    }
                  />
                  <Route
                    path="/library"
                    element={
                     // <ProtectedRoute cookie={cookie}>
                        <Library/>
                     // </ProtectedRoute>
                    }
                  />
                  <Route path='/playlist/:playlistID' element={<SinglePlaylistView/>}/>
                  <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                  </songContext.Provider>

      ):(
      <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            {/* <Route path="/home" element={<HomeComponent />} /> */}

           
            <Route path="*" element={<Navigate to={cookie ? '/home' : '/login'} />} />
          </Routes>
        
      )
      
    
    }



      </BrowserRouter>
    </div>
  );
}

export default App;
