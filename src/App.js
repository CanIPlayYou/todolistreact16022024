import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (e) => { // (e) =>  Skrócony zapis funkcji strzałkowej
    setTaskName(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '') {
      setTasks([...tasks, { name: taskName, completed: false }]); //Zapis "...tasks" używamy tutaj operatora rozwinięcia który pozwala na rozbicie zawartości tablicy na pojedyńcze elementy
      setTaskName('');
    }
  };

  const handleCheckboxChange = (index) => { //Funkcja zmieniająca zadanie na skończone
    const updatedTasks = [...tasks]; //Zapis "...tasks" używamy tutaj operatora rozwinięcia który pozwala na rozbicie zawartości tablicy na pojedyńcze elementy
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => { //Funkcja usuwającą zadanie na podstawie indeksu
    const updatedTasks = [...tasks]; //Zapis "...tasks" używamy tutaj operatora rozwinięcia który pozwala na rozbicie zawartości tablicy na pojedyńcze elementy, zapis ten pozwala również na uniknięcie modyfikacji oryginalnej tablicy
    updatedTasks.splice(index, 1); // Usuwamy jeden element z tablicy updatedTasks na podstawie indeksu
    setTasks(updatedTasks);
  };

  return (
    <div className='Window'>
      <div className='NavBar'>
        <h1>ToDoList</h1>
      </div>

      <div className='Main'>
        <div className='List'>
          <Form onSubmit={handleAddTask} className='formm'>
            <Form.Control type="text" placeholder="Podaj nazwe zadania: " value={taskName} onChange={handleInputChange}/>
            <Button variant="dark" type="submit">Dodaj</Button>
          </Form>

          <div className='ItemsInList'>
            <div className='Items'>
              {tasks.map((task, index) => (
                <div key={index} className="item">
                  <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(index)}/> {/*Checkbox - po zaznaczeniu ustawia zadanie na skończone */}

                  <h1 className='taskName' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</h1> {/*Nazwa zadania, zależnie od stopnia ukończenia ustawia dekoracje tekstu na nieprzekreślony bądź przekreślony */}

                  <span className="remove-button" onClick={() => handleRemoveTask(index)}>X</span> {/*Guzik służący do usuwania danego przedmiotu */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='Foter'>
        <h1>Liczba zadań w liście: {tasks.length}, Wykonano {Math.floor((tasks.filter(task => task.completed).length / tasks.length) * 100)}%</h1> {/*Pokazuje ilość rzeczy, oraz oblicza procent ile rzeczy jest skończonych */}
      </div>
    </div>
  );
}

export default App;
