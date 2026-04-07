import { useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import SavedIcon from '../assets/images/saved.svg';
import UnsavedIcon from '../assets/images/unsaved.svg';

interface SaveButtonProps {
  initialSaved?: boolean;
  size?: number;
  style?: ViewStyle;
  onSaveChange?: (isSaved: boolean) => void;
}

export function SaveButton({ initialSaved = false, size = 16, style, onSaveChange }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handlePress = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    onSaveChange?.(newState);
  };

  return (
    <TouchableOpacity 
      style={[{
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      }, style]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {isSaved ? (
        <SavedIcon width={size} height={size} />
      ) : (
        <UnsavedIcon width={size} height={size} />
      )}
    </TouchableOpacity>
  );
}

export default SaveButton;
