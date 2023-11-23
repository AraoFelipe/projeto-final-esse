// localStorage.setItem(carrinho)
let carrinho = [];
let total = 0;

const produtos = {
    hamburguer: [{ 
            id: 1, 
            nome: 'Hambúrguer Clássico', 
            preco: 15.00, 
            ingredientes: ['Hanburger 120g', 'Queijo' , 'Presunto', 'Alface', 'Tomate', 'Maionese', 'Salsicha '] 
        },
        { 
            id: 2, 
            nome: 'Hambúrguer Vegetariano', 
            preco: 12.00, 
            ingredientes: ['Hamburguer de Soja 250g','Alface', 'Tomate', 'Maionese de abacate'] 
        },
        { 
            id: 3, 
            
            nome: 'Hambúrguer de Frango', 
            preco: 12.00, 
            ingredientes: ['Hamburguer de frando 120g', 'Queijo', 'Alface', 'Tomate', 'Maionese especial '] 
        },
        { 
            id: 4, 
            nome: 'Hambúrguer Duplo', 
            preco: 28.00, 
            ingredientes: ['2 hamburgues de 250g', 'Queijo Cheddar  ', 'Maionese da casa'] 
        },
        { 
            id: 5, 
            nome: 'Hambúrguer com Queijo', 
            preco: 20.00, 
            ingredientes: ['320g de Queijo Coalho', 'Molho feito com mel e ervas', 'hamburguer 120g'] 
        },
        { 
            id: 6, 
            nome: 'Hambúrguer Especial', 
            preco: 32, 
            ingredientes: ['Hamburger 420g', 'Queijo', 'Alface', 'Molho Especial', 'Bacon', 'Ovo'] 
        },
       
    ],
    batatafrita: [{ id: 7, nome: 'Batatas Fritas Pequenas 120g', preco: 5.00 },
        { id: 8, nome: 'Batatas Fritas Média 250g' , preco: 8.00 },
        { id: 19, nome: 'Batata Frita Grande 500g', preco: 12.00 },
        { id: 20, nome: 'Batata Frita com Bacon, Queijo e Cheddar', preco: 20.00 },
        
    ],
    milkshake: [{ id: 9, nome: 'Milkshake de Morango', preco: 14.00 },
        { id: 10, nome: 'Milkshake de Chocolate', preco: 14.00 },
        { id: 11, nome: 'Milkshake de Baunilha', preco: 14.00 },
        { id: 12, nome: 'Milkshake de Caramelo', preco: 14.00 },
       
    ],
    bebida: [{ id: 13, nome: 'Sucos', preco: 10.00 },
        { id: 14, nome: 'Refrigerantes', preco: 5.00 },
        { id: 15, nome: 'Água Mineral', preco: 3.00 },
        { id: 16, nome: 'Água com Gás', preco: 3.50 },
        { id: 17, nome: 'Vitaminas', preco: 10.00 },
        { id: 18, nome: 'Limonada Suiça', preco:10.50 },
       
    ],
};

function exibirProdutos(categoria) {
    const produtosCategoria = produtos[categoria];
    const produtosElemento = document.getElementById('produtos');

    produtosElemento.innerHTML = '';

    produtosCategoria.forEach(produto => {
        const card = criarCardProduto(produto);
        produtosElemento.appendChild(card);
    });
}

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'produto';
    
    const imagem = document.createElement('img');
    imagem.src = `fotos/hamburguer-com-batata-frita-e-milkshake_807701-1603.avif`; 
    imagem.alt = produto.nome;

    const nome = document.createElement('h3');
    nome.textContent = produto.nome;
    

    if (produto.ingredientes) {
        const ingredientes = document.createElement('p');
        ingredientes.textContent = `Ingredientes: ${produto.ingredientes.join(', ')}`;
        card.appendChild(ingredientes);
    }

    const preco = document.createElement('p');
    preco.textContent = `R$ ${produto.preco.toFixed(2)}`;

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = 'Adicionar ao Carrinho';
    botaoAdicionar.onclick = () => adicionarAoCarrinho(produto.id, produto.nome, produto.preco);

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(botaoAdicionar);

    return card;
}

function adicionarAoCarrinho(idProduto, nomeProduto, precoProduto) {
    let itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id: idProduto, nome: nomeProduto, preco: precoProduto, quantidade: 1 });
    }

    total += precoProduto;

    atualizarCarrinho();
}

function removerDoCarrinho(idProduto, precoProduto) {
    let itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        total -= precoProduto;
        if (itemExistente.quantidade > 1) {
            itemExistente.quantidade -= 1;
        } else {
            carrinho = carrinho.filter(item => item.id !== idProduto);
        }

        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const itensCarrinhoElemento = document.getElementById('itens-carrinho');
    const totalCarrinhoElemento = document.getElementById('total-carrinho');

    itensCarrinhoElemento.innerHTML = '';

    carrinho.forEach(item => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerDoCarrinho(item.id, item.preco);

        itemLista.appendChild(botaoRemover);
        itensCarrinhoElemento.appendChild(itemLista);
    });

    totalCarrinhoElemento.textContent = `Total: R$ ${Math.max(total, 0).toFixed(2)}`;
}

function finalizarCompra() {
    gerarQRCode();
    alert('Compra finalizada! Examine o QR Code para efetuar o pagamento.');
}

function gerarQRCode() {
    let qrCode = new QRious({
        element: document.getElementById('qrcode'),
        value: `https://seusite.com/pagamento?total=${Math.max(total, 0).toFixed(2)}`,
        size: 200
    });
}

function irParaPaginaPrincipal() {
    window.location.href = 'index.html';
}


window.onload = function () {
    exibirProdutos('hamburguer');
};
