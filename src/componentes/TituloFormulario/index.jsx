import './titulo-formulario.estilos.css'

//no react, componentes são funções que retornam elementos JSX, que são uma extensão de sintaxe do JavaScript. O JSX permite escrever HTML dentro do JavaScript, facilitando a criação de interfaces de usuário.

//props é um objeto que contém as propriedades passadas para um componente. Ele é usado para passar dados e configurações para os componentes filhos, permitindo que eles sejam reutilizáveis e personalizáveis. As props são imutáveis, ou seja, não podem ser alteradas dentro do componente que as recebe, mas podem ser usadas para renderizar conteúdo dinâmico com base nos valores fornecidos.

export function TituloFormulario({children}) {
  return(
    <h2 className='titulo-form'>
      {children}
    </h2>
  )
}