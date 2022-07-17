import {closeModal, openModal} from "./modal"; 
import { postData } from "../services/services";

function forms(formSelector, modalTimerId){
     // forms work with server

     const forms = document.querySelectorAll(formSelector);
    
     const message = {
         loading: "img/form/spinner.svg",
         success: "Success",
         failure: "Faile"
     };
    
     forms.forEach(form => {
         bindPostData(form);
     });
    
     
 
     function bindPostData(form){
         form.addEventListener("submit", (e)=>{
             e.preventDefault();
                         
             const statusMessage = document.createElement("img");
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
 
             const btnText = form.querySelector("button").innerHTML;
             form.querySelector("button").innerHTML ="";
             form.querySelector("button").append(statusMessage);
 
             
             //use headers if we need send data in json format
             // r.setRequestHeader("Content-type", "multipart/form-data"); -> if we use new FormData setRequestHeader we dont need use HEADER!!!!!! IMPORTANT!!!!!
             // multipart/form-data -> use for works with FormData
 
             
             const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
                         
             postData("http://localhost:3000/requests", json)
             .then(data =>{
                 showThanksModal(message.success);
                 statusMessage.remove();
                 form.querySelector("button").innerHTML = btnText;
             }).catch(()=>{
                 showThanksModal(message.failure);
             }).finally(()=>{
                 form.reset();
             });
         });
 
     }
 
     function showThanksModal(message){
         const prevModalDialog = document.querySelector(".modal__dialog");
 
         prevModalDialog.classList.add("hide");
         openModal(".modal", modalTimerId);
 
         const thanlsModal = document.createElement("div");
         thanlsModal.classList.add("modal__dialog");
         thanlsModal.innerHTML = `            
             <div class="modal__content">
                 <div data-close class="modal__close">&times;</div>
                 <div class="modal__title">${message}</div>
             </div>`;
         document.querySelector(".modal").append(thanlsModal);
         setTimeout(()=>{
             thanlsModal.remove();
             prevModalDialog.classList.add("show");
             prevModalDialog.classList.remove("hide");
             closeModal(".modal");
         }, 4000);
 
     }
 
}

export default forms;