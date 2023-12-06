import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const App = () => {
  const [data, setData] = useState({});
  const [frameworks, setFrameworks] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/profile`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result && result.length > 0) {
          setData(result[0]);
          setFrameworks(result[0].frameworks);
          setHobbies(result[0].hobbies);
          console.log(result[0])
        } else {
          console.error('El servidor no devolvió datos válidos.');
        }
      } else {
        console.error('Error al cargar datos desde la API');
      }
    } catch (err) {
      console.error('Error al realizar la solicitud a la API:', err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      name: data.name || '',
      lastname: data.lastname || '',
      summary: data.summary || '',
      city: data.city || '',
      country: data.country || '',
      email: data.email || '',
    });
  };

  const handleHobbyName = (value, index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index] = { ...updatedHobbies[index], name: value };
    setHobbies(updatedHobbies);
  };

  const handleHobbyDescription = (value, index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index] = { ...updatedHobbies[index], description: value };
    setHobbies(updatedHobbies);
  };

  const handleFrameworkName = (value, index) => {
    const updatedFrameworks = [...frameworks];
    updatedFrameworks[index] = { ...updatedFrameworks[index], name: value };
    setFrameworks(updatedFrameworks);
  };

  const handleFrameworkLevel = (value, index) => {
    const updatedFrameworks = [...frameworks];
    updatedFrameworks[index] = { ...updatedFrameworks[index], level: value };
    setFrameworks(updatedFrameworks);
  };

  const handleFrameworkYear = (value, index) => {
    const updatedFrameworks = [...frameworks];
    updatedFrameworks[index] = { ...updatedFrameworks[index], year: value };
    setFrameworks(updatedFrameworks);
  };


  const saveChanges = async () => {
    const formData = {
      ...data,
      hobbies: [...hobbies],
      frameworks: [...frameworks],
    };

    try {
      const response = await fetch(`http://localhost:3001/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Cambios guardados exitosamente!');
        fetchData();
      } else {
        console.error('Error al guardar cambios');
      }
    } catch (err) {
      console.error('Error al guardar cambios:', err);
    }
    setEditMode(false);
  };

  const deleteFramework = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/profile/frameworks/${_id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        console.log('Framework eliminado exitosamente!');
        fetchData();
      } else {
        console.error('Error al eliminar el framework:', response.statusText);
      }
    } catch (err) {
      console.error('Error al realizar la solicitud de eliminación:', err);
    }
  };

  const deleteHobby = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/profile/hobby/${_id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        console.log('Hobby eliminado exitosamente!');
        fetchData();
      } else {
        console.error('Error al eliminar el hobby:', response.statusText);
      }
    } catch (err) {
      console.error('Error al realizar la solicitud de eliminación:', err);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.line}>
        <View style={styles.buttonRight}>
          {editMode ? (
            <Button style={styles.buttonSave} labelStyle={styles.buttonLabel} onPress={saveChanges}>
              Guardar
            </Button>
          ) : (
            <Button style={styles.buttonEdit} labelStyle={styles.buttonLabel} onPress={handleEdit}>
              Editar
            </Button>
          )}
          </View>
        </View>
        <View style={styles.line}>
          <Text style={styles.text}>{data.name} {data.lastname}</Text>
          <Text style={styles.text}>{data.summary}</Text>
          <Text style={styles.text}>{data.city}, {data.country}</Text>
          <Text style={styles.text}>{data.email}</Text>
          {editMode && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={data.name}
                onChangeText={(text) => setData({ ...data, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={data.lastname}
                onChangeText={(text) => setData({ ...data, lastname: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Resumen"
                value={data.summary}
                onChangeText={(text) => setData({ ...data, summary: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Ciudad"
                value={data.city}
                onChangeText={(text) => setData({ ...data, city: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="País"
                value={data.country}
                onChangeText={(text) => setData({ ...data, country: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={data.email}
                onChangeText={(text) => setData({ ...data, email: text })}
              />
            </>
          )}
        </View>
      <View style={styles.separator} />

      <Text style={styles.title}>Hobbies</Text>
      {hobbies.map((hobby, index) => (
        <View key={hobby._id} style={styles.line}>
          <Text style={styles.text}>{`${index + 1}. ${hobby.name}: ${hobby.description}`}</Text>
          {editMode && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={hobby.name}
                onChangeText={(text) => handleHobbyName(text, index)}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={hobby.description}
                onChangeText={(text) => handleHobbyDescription(text, index)}
              />
            </>
          )}
          <View style={styles.buttonRight}>
          <Button onPress={() => deleteHobby(hobby._id)} style={styles.button} labelStyle={styles.buttonLabel}>
            Eliminar
          </Button>
          </View>
        </View>
      ))}

      <View style={styles.separator} />
      <Text style={styles.title}>Frameworks</Text>
      {frameworks.map((framework, index) => (
        <View key={framework._id} style={styles.line}>
          <Text style={styles.text}>{`${index + 1}.${framework.name}, ${framework.level}, ${framework.year}`}</Text>
          <Text></Text>
          {editMode && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={framework.name}
                onChangeText={(text) => handleFrameworkName(text, index)}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={framework.level}
                onChangeText={(text) => handleFrameworkLevel(text, index)}
              />
              <TextInput
                style={styles.input}
                placeholder="Año"
                value={framework.year}
                onChangeText={(text) => handleFrameworkYear(text, index)}
              />

            </>
          )}
          <View style={styles.buttonRight}>
            <Button onPress={() => deleteFramework(framework._id)} style={styles.button} labelStyle={styles.buttonLabel}>
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    fontFamily: 'Inika',
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'Inika',
    textAlign: 'start',
    marginTop: 5
  },
  button: {
    height: 30,
    borderRadius: 10,
    marginTop: 5,
    width: 100,
    backgroundColor: '#e93f2f',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEdit: {
    height: 30,
    borderRadius: 10,
    marginTop: 5,
    width: 100,
    backgroundColor: '#dcb316',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSave: {
    height: 30,
    borderRadius: 10,
    marginTop: 5,
    width: 100,
    backgroundColor: '#52a907',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Inika',
    fontSize: 16,
    color: 'black'
  },
  text: {
    fontFamily: 'Inika',
    fontSize: 16,
    color: 'black',
    paddingBottom: 4
  },
  line: {
    width: '90%',
    margin: 5,
    marginStart: 10,
  },
  input: {
    fontFamily: 'Inika',
    paddingLeft: 15,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#ccc'
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 5
  },
  buttonRight: {
    alignItems: 'end'
  }
});


export default App;