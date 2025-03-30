const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Incomes-CXzRSnrV.js","assets/index-DHotAAVp.js","assets/index-BaG0YQkY.css","assets/add-image-CJwnxBQ3.js","assets/Incomes-BWmqG-cA.css","assets/Expenses-CVVW9K34.js","assets/Expenses-7iM-Arib.css","assets/Goals-DkhY2dwU.js","assets/Goals-CXO0isKm.css","assets/MonthlyReport-CYmIY69z.js","assets/MonthlyReport-CdL5fj5h.css"])))=>i.map(i=>d[i]);
import{u as g,r as t,j as e,_ as x}from"./index-DHotAAVp.js";const y="_header_1qk1z_1",k="_title_and_settings_1qk1z_29",v="_configBtn_1qk1z_41",E="_settings_1qk1z_57",z="_main_content_options_1qk1z_107",N="_activeBtn_1qk1z_153",i={header:y,title_and_settings:k,configBtn:v,settings:E,main_content_options:z,activeBtn:N};function B({users:c,setUsers:u,userLoggedIn:s,setUserLoggedIn:n,contentShowed:o,setContentShowed:a}){const d=g(),[h,m]=t.useState(!1);function f(){d("/log-in"),n(null)}function p(){confirm("Are you sure that you want to delete your account?")&&(fetch(`https://flask-api-0k43.onrender.com/users/${c[s].id}`,{method:"DELETE"}).then(()=>{fetch("https://flask-api-0k43.onrender.com/users").then(r=>r.json()).then(r=>u(r))}),d("/"))}function l(r){a(r),m(!1)}return e.jsxs("header",{className:i.header,children:[e.jsxs("section",{className:i.title_and_settings,children:[e.jsx("img",{onClick:()=>m(!h),className:i.configBtn,src:"https://us.123rf.com/450wm/pytyczech/pytyczech1802/pytyczech180200242/96360239-icono-de-l%C3%ADnea-de-tres-barras.jpg",alt:"config"}),e.jsxs("h1",{children:["Welcome ",c[s].username,"!"]}),h?e.jsxs("nav",{className:i.settings,children:[e.jsx("button",{onClick:f,children:"Log out"}),e.jsx("button",{onClick:p,children:"Delete account"})]}):null]}),e.jsxs("nav",{className:i.main_content_options,children:[e.jsx("button",{className:o=="incomes"?i.activeBtn:"",onClick:()=>l("incomes"),children:"Incomes"}),e.jsx("button",{className:o=="expenses"?i.activeBtn:"",onClick:()=>l("expenses"),children:"Expenses"}),e.jsx("button",{className:o=="goals"?i.activeBtn:"",onClick:()=>l("goals"),children:"Goals"}),e.jsx("button",{className:o=="monthly_report"?i.activeBtn:"",onClick:()=>l("monthly_report"),children:"Monthly report"})]})]})}const C="_finances_9jxmz_1",S={finances:C},b=t.lazy(()=>x(()=>import("./Incomes-CXzRSnrV.js"),__vite__mapDeps([0,1,2,3,4]))),A=t.lazy(()=>x(()=>import("./Expenses-CVVW9K34.js"),__vite__mapDeps([5,1,2,3,6]))),D=t.lazy(()=>x(()=>import("./Goals-DkhY2dwU.js"),__vite__mapDeps([7,1,2,8]))),I=t.lazy(()=>x(()=>import("./MonthlyReport-CYmIY69z.js"),__vite__mapDeps([9,1,2,10])));function R({users:c,userLoggedIn:u,contentShowed:s}){const n=c[u],[o,a]=t.useState([]),[d,h]=t.useState([]),[m,f]=t.useState(n.goals),[p,l]=t.useState(n.achieved_goals),[r,j]=t.useState(n.monthly_report);return t.useEffect(()=>{fetch(`https://flask-api-0k43.onrender.com/users/${n.id}/incomes`).then(_=>_.json()).then(_=>a(_))},[]),t.useEffect(()=>{fetch(`https://flask-api-0k43.onrender.com/users/${n.id}/expenses`).then(_=>_.json()).then(_=>h(_))},[]),e.jsx("div",{className:S.finances,children:e.jsxs(t.Suspense,{fallback:e.jsx("h1",{children:"Loading..."}),children:[s==="incomes"?e.jsx(b,{user:n,incomes:o,setIncomes:a}):null,s==="expenses"?e.jsx(A,{user:n,expenses:d,setExpenses:h}):null,s==="goals"?e.jsx(D,{user:n,goals:m,setGoals:f,achievedGoals:p,setAchievedGoals:l}):null,s==="monthly_report"?e.jsx(I,{user:n,reports:r,setReports:j,incomes:o,setIncomes:a,expenses:d,setExpenses:h,goals:m,setGoals:f,achievedGoals:p,setAchievedGoals:l}):null]})})}const q="_footer_container_1vw24_1",$={footer_container:q};function F(){return e.jsx("footer",{className:$.footer_container,children:e.jsxs("p",{children:[new Date().getFullYear()," © Limitless"]})})}const G="_UI_container_8gh8z_1",L={UI_container:G};function P({userLoggedIn:c,setUserLoggedIn:u,users:s,setUsers:n}){const[o,a]=t.useState("incomes");return e.jsx(e.Fragment,{children:c!=null&&s.length>0?e.jsxs("div",{style:{overflowY:s[c].expenses.length>16?"scroll":"hidden"},className:L.UI_container,children:[e.jsx(B,{users:s,setUsers:n,userLoggedIn:c,setUserLoggedIn:u,contentShowed:o,setContentShowed:a}),e.jsx(R,{users:s,userLoggedIn:c,contentShowed:o}),e.jsx(F,{})]}):e.jsx("h1",{children:"Loading..."})})}export{P as default};
