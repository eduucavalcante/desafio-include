import Button from "../Button";

function ConteudoInstucional() {
    return (
        <div className="w-full p-4 md:p-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto order-2 md:order-none">
                    <Button
                        text="Conteúdo Principal"
                        color="#004BAF"
                        colorIcon="#FFF"

                    />
                    <Button
                        text="Gerenciar Mídias"
                        color="#F4F4F4"
                        textColor="#000"

                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 md:p-6">
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Missão
                    </label>
                    <input
                        type="text"
                        disabled
                        value="Desenvolver soluções inovadoras que transformem  empresas e formem profissionais de excelência."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Visão</label>
                    <input
                        type="text"
                        disabled
                        value="Ser referência em consultoria júnior no Brasil, reconhecida pela qualidade e impacto dos nossos projetos."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Valores</label>
                    <input
                        type="text"
                        disabled
                        value="Ética, Excelência, Inovação, Trabalho em equipe e Compromisso com resultados"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm text-gray-700">História</label>
                    <input
                        type="text"
                        disabled
                        value="Fundada em 2010, a Vale Jr nasceu com o propósito de conectar o conhecimento acadêmico às necessidades do mercado..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm text-gray-700">Texto Institucional</label>
                    <input
                        type="text"
                        disabled
                        value="Somos uma empresa júnior de consultoria formada por estudantes comprometidos com a excelências."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>
            </div>
        </div>
    )
}

export default ConteudoInstucional;