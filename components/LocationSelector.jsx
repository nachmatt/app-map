import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'
import {COLORS} from '../constants'

const LocationSelector = (props) => {
    const [pickedLocation, setPickedLocation] = useState()
    // https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=YOUR_API_KEY&signature=YOUR_SIGNATURE
    const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000, 
        })

        setPickedLocation({
            lat: location.coords.latitude, 
            lng: location.coords.longitude
        })

        props.onLocation({
            lat: location.coords.latitude, 
            lng: location.coords.longitude
        })
    }

    const verifyPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes.', 
                'Necesita dar permisos de la ubicación para usar la apilación.', 
                {text: 'Ok'}
            )
            return false
        }
        return true
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {pickedLocation ? (
                    <Text>
                        {pickedLocation.lat}, {pickedLocation.lng}
                    </Text>
                ): (
                    <Text>Esperando ubicación</Text>
                )}
            </View>
            <Button 
                title='Obtener ubicación' 
                color={COLORS.PEACH_PUFF} 
                onPress={handleGetLocation}></Button>
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1
    },
})