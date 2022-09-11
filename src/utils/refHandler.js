export const toggleOptionByRef = (...refs) => {
  for (let i = 0; i < refs.length; i++) {
    if (getComputedStyle(refs[i].current).display === 'none') {
      refs[i].current.style.display = 'block';
    } else {
      refs[i].current.style.display = 'none';
    }
  }
};
