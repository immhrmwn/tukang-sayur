const isLoggedin = (req, res, next) => {
  if(req.session.userId){
    next()
  } else {
    res.redirect('/login?error=Tolong login terlebih dahulu!')
  }
}

const isLoggedOut = (req, res, next) => {
  if(req.session.userId){
    res.redirect('/?error=Anda sudah Login')
  } else {
    next()
  }
}

const isAdmin = (req, res, next) => {
  if(req.session.userId && req.session.userRole === 'admin'){
    next()
  } else {
    res.redirect('/?error=tidak punya akses ke halaman ini!')
  }
}

module.exports = {isLoggedin, isAdmin, isLoggedOut}