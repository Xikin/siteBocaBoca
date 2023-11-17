//Componente responsavel por fazer as verificações de Permissoes de Acesso dos usuarios logados
// e dar uma resposta ao client site da aplicação.

const checkAccess = (permission) => {
    return async (req, res, next) => {
    
    //Verifica se os usuarios tem alguma das regras de acesso abaixo e nega acesso ao 
    //dashboard baseado nas regras de negocio estabelecidas.

    // Se o usuario for o Admin ou o Owner ("Dono") do local ele tera a cesso ao local no dashboard.
        if (permission.roles.includes(req.user?.role)) return next();
      if (!permission?.owner)
        return res
          .status(401)
          .json({ success: false, message: 'Acesso Negado!' });
      const isOwner = await permission.owner(req);
      if (isOwner === true) return next();
      if (isOwner === false)
        return res
          .status(401)
          .json({ success: false, message: 'Acesso Negado!' });
      res
        .status(500)
        .json({
          success: false,
          message: 'Algo deu errado! Tente novamente mais tarde!',
        });
    };
  };
  
  export default checkAccess;