import{r as l,j as e}from"./index-DHotAAVp.js";import{a as m}from"./add-image-CJwnxBQ3.js";const u="_incomes_nwc1w_1",_="_incomes_container_nwc1w_21",x="_addBtn_nwc1w_21",j="_new_income_container_nwc1w_81",p="_add_income_btn_nwc1w_123",v="_cancel_btn_nwc1w_129",w="_add_form_nwc1w_135",f="_no_incomes_nwc1w_167",r={incomes:u,incomes_container:_,addBtn:x,new_income_container:j,add_income_btn:p,cancel_btn:v,add_form:w,no_incomes:f};function g({user:t,setSectionShowed:o,setIncomes:c}){const[n,a]=l.useState({date:new Date().toISOString().split("T")[0],amount:"",currency:"Soles",provenance:"Salary"});async function d(){if(n.amount===""){alert("Amount can't be null");return}try{if(!(await fetch(`https://flask-api-0k43.onrender.com/users/${t.id}/incomes`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...n,amount:Number(parseFloat(n.amount).toFixed(2))})})).ok)throw new Error("Error al agregar el ingreso");fetch("https://flask-api-0k43.onrender.com/users").then(i=>i.json()).then(i=>c(i[i.findIndex(h=>h.username===t.username)].incomes)).then(()=>o("incomes_container"))}catch(s){console.error("Error al agregar el nuevo ingreso:",s)}}return e.jsxs("div",{className:r.new_income_container,children:[e.jsx("h2",{children:"Add new income"}),e.jsxs("form",{className:r.add_form,children:[e.jsxs("section",{children:[e.jsx("label",{children:"Date:"}),e.jsx("input",{type:"date",value:n.date,onChange:s=>a({...n,date:s.target.value})})]}),e.jsxs("section",{children:[e.jsx("label",{children:"Amount:"}),e.jsx("input",{type:"number",placeholder:"Enter amount...",value:n.amount,onChange:s=>a({...n,amount:s.target.value})})]}),e.jsxs("section",{children:[e.jsx("label",{children:"Currency:"}),e.jsxs("select",{value:n.currency,onChange:s=>a({...n,currency:s.target.value}),children:[e.jsx("option",{value:"Soles",children:"Soles"}),e.jsx("option",{value:"USD",disabled:!0,children:"USD"})]})]}),e.jsxs("section",{children:[e.jsx("label",{children:"Provenance:"}),e.jsxs("select",{value:n.provenance,onChange:s=>a({...n,provenance:s.target.value}),children:[e.jsx("option",{value:"Salary",children:"Salary"}),e.jsx("option",{value:"Meal per diem",children:"Meal per diem"}),e.jsx("option",{value:"Offered services",children:"Offered services"}),e.jsx("option",{value:"Return on investment",children:"Return on investment"}),e.jsx("option",{value:"Bonuses",children:"Bonuses"}),e.jsx("option",{value:"Tips",children:"Tips"}),e.jsx("option",{value:"Others",children:"Others"})]})]})]}),e.jsx("button",{className:r.add_income_btn,onClick:d,children:"Add"}),e.jsx("button",{className:r.cancel_btn,onClick:()=>o("incomes_container"),children:"Cancel"})]})}function b({incomes:t,setContentShowed:o}){return e.jsxs("main",{className:r.incomes_container,children:[e.jsx("img",{className:r.addBtn,onClick:()=>o(""),src:m,alt:""}),t&&t.length!==0?e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Currency"}),e.jsx("th",{children:"Provenance"})]})}),e.jsx("tbody",{children:t.map((c,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:c.date}),e.jsx("td",{style:{textAlign:"right",fontWeight:"bold"},children:parseFloat(c.amount).toFixed(2)}),e.jsx("td",{children:c.currency}),e.jsx("td",{children:c.provenance})]},n))})]}):e.jsxs("div",{className:r.no_incomes,children:[e.jsx("h1",{children:e.jsx("em",{children:"No incomes to show"})}),e.jsx("h2",{children:e.jsxs("em",{children:['Tap "',e.jsx("span",{children:"+"}),'" icon to add an income']})})]})]})}function C({user:t,incomes:o,setIncomes:c}){const[n,a]=l.useState("incomes_container"),[d,s]=l.useState(!0);return l.useEffect(()=>{o!==null&&s(!1)},[o]),e.jsx(e.Fragment,{children:d?e.jsx("h1",{children:"Loading..."}):o?e.jsx("div",{className:r.incomes,style:{overflowY:o.length>16&&n=="incomes_container"?"scroll":"hidden"},children:n=="incomes_container"?e.jsx(b,{incomes:o,setContentShowed:a}):e.jsx(g,{user:t,setSectionShowed:a,setIncomes:c})}):null})}export{C as default};
