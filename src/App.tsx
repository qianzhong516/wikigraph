import './styles/App.css';
import WikiGraph, { IdType } from './components/wikigraph';
import Layout from './components/layout';
import { useRef, useState } from 'react';
import CurrentNodes from './components/currentNodes';
import SelectedNodes from './components/selectedNodes';

const NEO4J_DB = String(process.env.REACT_APP_NEO4J_DB);
const NEO4J_URI = String(process.env.REACT_APP_NEO4J_URI);
const NEO4J_USER = String(process.env.REACT_APP_NEO4J_USER);
const NEO4J_PASSWORD = String(process.env.REACT_APP_NEO4J_PASSWORD);

function App() {
	// keep track of search bar input
	const [input, setInput] = useState("");
	const [search, setSearch] = useState("Universe");
	// update state for user search
	const handleSearchChange = (event: { target: { value: string; }; }) => {
		setInput(event.target.value);
	};
	const handleSearch = () => {
		setSearch(input);
	};

	// keep track of selected nodes 
	const [selection, setSelection] = useState<IdType[]|undefined>();
	// update state for user selection
	const handleSelect = (selection: IdType[] | undefined) => {
		if (selection) { setSelection(selection); }
	};
	
	// keep track of whether to stabilize or not
	const [stabilize, setStabilize] = useState(false);
	const handleStabilize = (stabilize: boolean) => {
		setStabilize(stabilize)
	}

	// keep track of wikigraph reference
	const visRef = useRef<HTMLDivElement>(null);

    return (
		<Layout>
			<header>
				<h1>WikiGraph</h1>
				<p className='subtitle'>A graph-based approach to exploring the depths of Wikipedia</p>
			</header>
			<div className="App">
				{/* graph visualization */}
				<WikiGraph
					// pass a reference object and the search state to the wikigraph child component
					// so we can update the visualization when the search state changes 
					ref={visRef}
					containerId={"vis"}
					serverDatabase={NEO4J_DB}
					serverURI={NEO4J_URI}
					serverUser={NEO4J_USER}
					serverPassword={NEO4J_PASSWORD}
					search={search}
					stabilize={stabilize}
					handleStabilize={handleStabilize}
					handleSelect={handleSelect}
				/>
				{/* sidebar */}
				<div className="sidebar">
					<CurrentNodes/>
					<br/>
					<SelectedNodes selection={selection}/>
					<div className="search-bar">
						Search for a Wikipedia article:<br/>
						<form id="search" action="#" onSubmit={handleSearch}>
							<input type="search" id="search" placeholder="Article title" onChange={handleSearchChange}/>
							<input type="submit" value="Submit" id="reload" onClick={handleSearch}/>
						</form>
					</div>
				</div>
			</div>
		</Layout>
    )
}

export default App;
