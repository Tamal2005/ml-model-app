# importing the needed libraries
import numpy as np
import librosa
from IPython.display import Audio, display 
import matplotlib.pyplot as plt 

from sklearn.model_selection import train_test_split
from tensorflow import keras
import os

# load the labeled audio
with_fake_audios = os.listdir('data/fake/')
with_real_audios = os.listdir('data/real/')
len(with_fake_audios), len(with_real_audios)

# create the labels from with fake audio will be 1 and for real audio 0 
with_fake_labels = [1]*6308
with_real_labels = [0]*34605
labels = with_fake_labels + with_real_labels

# Load and play the audio
audio, sr = librosa.load('data/fake/fake_0001.wav')
display(Audio(audio, rate=sr))
data = []
fake_audio_path = 'data/fake/'

for audio_file in os.listdir(fake_audio_path):
    if audio_file.endswith(".wav"):
        # Load audio
        audio, sr = librosa.load(os.path.join(fake_audio_path, audio_file), sr=22050, mono=True)

        # Extract features
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13).mean(axis=1)
        chroma = librosa.feature.chroma_stft(y=audio, sr=sr).mean(axis=1)
        contrast = librosa.feature.spectral_contrast(y=audio, sr=sr).mean(axis=1)

        # Combine into one feature vector
        features = np.concatenate([mfccs, chroma, contrast])

        data.append(features)
real_audio_path = 'data/real/'

for audio_file in os.listdir(real_audio_path):
    if audio_file.endswith(".wav"):
        # Load audio
        audio, sr = librosa.load(os.path.join(real_audio_path, audio_file), sr=22050, mono=True)

        # Extract features
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13).mean(axis=1)
        chroma = librosa.feature.chroma_stft(y=audio, sr=sr).mean(axis=1)
        contrast = librosa.feature.spectral_contrast(y=audio, sr=sr).mean(axis=1)

        # Combine into one feature vector
        features = np.concatenate([mfccs, chroma, contrast])

        data.append(features)
len(data), len(labels)
type(data[0]), data[0].shape

# differentiating the dataset
x = np.array(data) 
y = np.array(labels)

# splitting the dataset
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
model = keras.Sequential()

# Fix: Use single integers for 1D convolution
model.add(keras.layers.Conv1D(32, kernel_size=3, activation='relu', input_shape=(32, 1)))  # Added channel dimension
model.add(keras.layers.MaxPooling1D(pool_size=2))  # Single integer, not tuple
model.add(keras.layers.Conv1D(64, kernel_size=3, activation='relu'))
model.add(keras.layers.MaxPooling1D(pool_size=2))
model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(128, activation='relu'))
model.add(keras.layers.Dropout(0.5))
model.add(keras.layers.Dense(64, activation='relu'))
model.add(keras.layers.Dropout(0.5))
model.add(keras.layers.Dense(32, activation='relu'))
model.add(keras.layers.Dropout(0.5))

# Fix: For binary classification, use 1 output with sigmoid OR 2 outputs with softmax
model.add(keras.layers.Dense(2, activation='sigmoid')) 

# compile the neural network 
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
history = model.fit(x_train, y_train, validation_split=0.1, epochs=10) 
h = history

# plot the loss value
plt.plot(h.history['loss'], label='train loss')
plt.plot(h.history['val_loss'], label='validation loss')
plt.legend()
plt.show()

# plot the accuracy value
plt.plot(h.history['accuracy'], label='train accuracy')
plt.plot(h.history['val_accuracy'], label='validation accuracy')
plt.legend()
plt.show()

# Get audio file path from user
audio_path = input('Path of the audio to be predicted: ')

# Load audio
audio, sr = librosa.load(audio_path)

# Display audio player
print("Audio loaded successfully!")
display(Audio(audio, rate=sr))

# Extract features
mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
chroma = librosa.feature.chroma_stft(y=audio, sr=sr)
spectral_contrast = librosa.feature.spectral_contrast(y=audio, sr=sr)

# Combine features
features = np.concatenate([mfccs.mean(axis=1), chroma.mean(axis=1), spectral_contrast.mean(axis=1)])
print(f"Extracted features shape: {features.shape}")

# Scale the features (reshape for scaler)
features_reshaped = features.reshape(1, -1)  # Reshape to (1, n_features)

# Make prediction
input_prediction = model.predict(features_reshaped)
print(f"Raw prediction: {input_prediction}")

# Get predicted class
input_pred_label = np.argmax(input_prediction)
print(f"Predicted class: {input_pred_label}")

# Display result
if input_pred_label == 1:
    print('The audio is FAKE')
else:
    print('The audio is REAL')