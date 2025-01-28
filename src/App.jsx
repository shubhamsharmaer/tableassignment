import tasks from '../WMS.tasks.json';
import departments from '../departments.json';
import MainTable from './components/MainTable'
function App() {
  return (
    <div>
      {/* <NewTask tasks={tasks} departments={departments} /> */}
      <MainTable tasks={tasks} departments={departments} />
    </div>
  );
}

export default App;
