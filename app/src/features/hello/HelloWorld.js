import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { setName } from './helloSlice';

const HelloWorld = () => {
  const name = useSelector((state) => state.hello.name);
  const dispatch = useDispatch();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      newName: ''
    }
  });

  const onSubmit = data => {
    dispatch(setName(data.newName));
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name}!</Text>
      
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: 'Name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your name"
            />
          )}
          name="newName"
        />
        {errors.newName && <Text style={styles.errorText}>{errors.newName.message}</Text>}

        <Button title="Update Name" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});

export default HelloWorld;
