import { Layout } from "../../layout/Layout"

export const Footer = () => {
    return (
        <footer className="p-4" style={{
            backgroundColor: '#B4B4B4'
        }}>

            <Layout>
                <p style={{
                    fontSize: '25px',
                    color: 'rgba(0, 0, 0, 0.62)'
                }}>&#9400; 2022 MovieApp - Derechos Reservados</p>
            </Layout>
        </footer>
    )
}