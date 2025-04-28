import './LogoTitulo.css'; // puedes darle estilos si quieres

function LogoTitulo() {
  return (
    <div className="c-logo-titulo">
      <img
        src="/assets/logo-star-wars.jpg"
        alt="Star Wars Logo"
        width="200"
        height="auto"
        loading="lazy"
      />
    </div>
  );
}

export default LogoTitulo;
