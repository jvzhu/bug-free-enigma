import React from 'react';
import { calculatePasswordEntropy, getPasswordStrength } from '../utils/crypto';

function PasswordStrengthMeter({ password }) {
  const strength = React.useMemo(() => getPasswordStrength(password), [password]);
  const entropy = React.useMemo(() => calculatePasswordEntropy(password), [password]);

  return (
    <div className="password-strength-meter">
      <div className="password-strength-meter-bar" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => {
          const active = index <= strength.level;
          return (
            <span
              key={index}
              className={`password-strength-meter-segment${active ? ' password-strength-meter-segment--active' : ''}`}
              style={active ? { backgroundColor: strength.color } : undefined}
            />
          );
        })}
      </div>
      <div className="password-strength-meter-meta">
        <strong style={{ color: strength.color }}>{strength.label}</strong>
        <span>{entropy.toFixed(1)} bits</span>
      </div>
    </div>
  );
}

export default PasswordStrengthMeter;
