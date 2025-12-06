

function ContatosInforAdmin() {
    return (
        <div className="w-full p-4 md:p-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
                <h1 className="text-xl font-semibold text-gray-800 order-1 md:order-none">
                    Contatos Institucionais
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 md:p-6">
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                        E-mail Institucional
                    </label>
                    <input
                        type="text"
                        disabled
                        value="contato@valejr.com.br"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">WhatsApp</label>
                    <input
                        type="text"
                        disabled
                        value="+55 85 99999-9999"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Endereço</label>
                    <input
                        type="text"
                        disabled
                        value="Av. UFC RUSSAS"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Redes Sociais</h2>

                <div className="mb-5">
                    <label className="block mb-1 text-sm text-gray-700">Facebook</label>
                    <input
                        type="text"
                        disabled
                        value="facebook.com/valejr"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm text-gray-700">Instagram</label>
                    <input
                        type="text"
                        disabled
                        value="@valejr"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm text-gray-700">LinkedIn</label>
                    <input
                        type="text"
                        disabled
                        value="linkedin.com/company/valejr"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>
            </div>
        </div>
    );
}

export default ContatosInforAdmin;