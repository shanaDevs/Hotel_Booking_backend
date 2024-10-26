import Room from "../models/room.js";
import { isAdminValid } from './userControllers.js';

export function createRoom(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json(
            { message: 'Only admins can create rooms' }
        )
    }

    const newRoom = Room(req.body)
    newRoom.save().then(
        (result) => {
            res.json(
                {
                    message: 'Room created successfully',
                    result: result,
                }
            )
        }
    ).catch(err => {
        res.status(500).json(
            { message: 'Server Error', error: err }
        )
    })
}

export function deleteRoom(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json(
            { message: 'Only admins can delete rooms' }
        )
    }
    const roomId = req.params.roomId
    roomId.findOneAndDelete({ roomId: roomId }).then(
        (result) => {
            if (!result) {
                return res.status(404).json(
                    { message: 'Room not found' }
                )
            }
            res.json(
                {
                    message: 'Room deleted successfully',
                    result: result,
                }
            )
        }
    ).catch(
        (err) => {
            res.status(500).json(
                { message: 'Server Error', error: err }
            )
        }
    )
}

export function findRoomByID(req, res) {
    const roomId = req.params.roomId
    Room.findOne({ roomId: roomId }).then(
        (result) => {
            if (!result) {
                return res.status(404).json(
                    { message: 'Room not found' }
                )
            } else {
                res.json(
                    {
                        message: 'Room found successfully',
                        result: result,
                    }
                )
            }
        }
    ).catch(
        () => {
            res.status(500).json(
                { message: 'Server Error', error: err }
            )
        }
    )
}
export function getRoom(req, res) {
    Room.find().then(
        (result) => {
            res.json(
                {
                    rooms: result,
                }
            )
        }
    ).catch(
        () => {
            res.status(500).json(
                { message: 'Server Error', error: err }
            )
        }
    )
}
export function updateRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json(
            { message: 'Only admins can update the  room' }
        )
        return
    }
    const roomId = req.params.roomId
    Room.findOneAndUpdate({
        roomId: roomId
    }, req.body).then(
        () => {
            res.json(
                { message: 'Room updated successfully' }
            )
        }
    ).catch(err => {
        res.status(500).json(
            { message: 'Server Error', error: err }
        )
    })
}

export function getRoomsByCategory(req, res) {
    const category = req.params.category
    Room.find({ category: category }).then(
        (result) => {
            res.json(
                {
                    result: result,
                }
            )
        }).catch(err =>
            res.status(500).json(
                { message: 'Server Error', error: err }
            )
        )
}
