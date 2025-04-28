import './style.css';

function Filtro({ onLetraChange }) {
  const letras = [
    "All", "A", "B", "C", "D", "E", "F", "G", "H", "I", 
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
    "T", "U", "V", "W", "X", "Y", "Z"
  ];

  return (
    <div className="c-filtro">
      {letras.map((unaLetra, index) => (
        <button className='' key={index} onClick={() => onLetraChange(unaLetra)}>
          {unaLetra}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
