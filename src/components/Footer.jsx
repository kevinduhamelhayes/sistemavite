

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
        <p>Política de Privacidad | Términos y Condiciones</p>
      </div>
    </footer>
  );
};

export default Footer;
