import face_recognition

def face_recog(faceImage, sceneImage):
    known_image = face_recognition.load_image_file(faceImage)
    unknown_image = face_recognition.load_image_file(sceneImage)

    known_encoding = face_recognition.face_encodings(known_image)
    if len(known_encoding) == 0:
        return False
    known_encoding = known_encoding[0]
    unknown_encoding = face_recognition.face_encodings(unknown_image)


    results = face_recognition.compare_faces(
        unknown_encoding, known_encoding)
    
    return True in results