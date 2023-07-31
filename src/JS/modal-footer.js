import Modal from './modal';
import { slider } from './slider';

export const modalFooter = () => {
  const footerLink = document.querySelector('#goit-students');

  footerLink.addEventListener('click', e => {
    e.preventDefault();

    const div = document.createElement('div');
    const modal = document.querySelector('.modal-footer');
    div.innerHTML = modal.outerHTML;
    div.querySelector('.modal-footer').classList.remove('is-hidden');

    new Modal(div, modalWindow => {
      slider(modalWindow);
    });
  });
};
