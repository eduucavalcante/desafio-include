import AdminNavbar from "../../components/NavBarAdmin";
import ConteudoInstucional from "../../components/ConteudoInstitucional";
import { LuImageMinus } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/Button";

function ConteuInstitucionalPage(){
    return(
        <div>
            <AdminNavbar/>
            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrativo</h1>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto order-2 md:order-none">
                            <Button
                                text="Adicionar Membro"
                                icon={AiOutlinePlus}
                                color="#004BAF"
                                colorIcon="#FFF"

                            />
                            <Button
                                text="Gerenciar Mídias"
                                icon={LuImageMinus}
                                color="#9810FA"
                                colorIcon="#FFF"

                            />
                        </div>
                    </div>

                    <ConteudoInstucional/>
                </div>
            </div>

        </div>
    )
}

export default ConteuInstitucionalPage;