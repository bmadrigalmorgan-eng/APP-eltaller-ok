importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyC712zoQmjfvgxa_RDIMB2UCSp93S_mlIo",
  authDomain:"el-taller-7483e.firebaseapp.com",
  projectId:"el-taller-7483e",
  storageBucket:"el-taller-7483e.firebasestorage.app",
  messagingSenderId:"615648184021",
  appId:"1:615648184021:web:abaa32547b5f746828445c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body, icon:'./icon-192.png', badge:'./icon-192.png', vibrate:[200,100,200], tag:'eltaller-pedido' });
});
