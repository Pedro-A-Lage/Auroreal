import React from 'react'

export function Newsletter() {
    return (
        <section id="newsletter" className="py-24 px-6 bg-[#F2EFE9]">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-serif mb-4 text-primary">
                    Faça Parte da Nossa Comunidade
                </h2>
                <p className="text-muted mb-8 font-light">
                    Inscreva-se para receber atualizações sobre lançamentos, eventos com autores e listas de leitura selecionadas.
                </p>

                <form
                    className="flex flex-col sm:flex-row gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        placeholder="Seu e-mail"
                        className="flex-1 px-4 py-3 bg-white border border-transparent focus:border-accent focus:ring-0 outline-none transition-colors placeholder:text-muted/50 text-primary"
                    />
                    <button className="px-8 py-3 bg-primary text-white font-medium tracking-wide hover:bg-accent transition-colors duration-300">
                        Inscrever-se
                    </button>
                </form>
            </div>
        </section>
    )
}
