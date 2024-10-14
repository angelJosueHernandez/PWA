const AuthChecker = ({ children }) => {
    const { isAuthenticated, isAuthInitialized } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
  
    useEffect(() => {
      if (isAuthInitialized) {
        setIsChecked(true);
      } else {
        // Solución temporal con un tiempo de espera
        const timeout = setTimeout(() => {
          setIsChecked(true);
        }, 1000); // Espera 1 segundo antes de renderizar los componentes hijos
  
        return () => clearTimeout(timeout);
      }
    }, [isAuthInitialized]);
  
    if (!isChecked) {
      return <div>Cargando...</div>;
    }
  
    return children;
  };