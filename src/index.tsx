import { createRoot } from 'react-dom/client'
import 'assets/index.css'
import App from 'components/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
document.documentElement.setAttribute("data-theme", "light");
root.render(<App />)
