'use client';

import { useState } from 'react';
import { X, Check, CreditCard, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  if (!isOpen) return null;

  const plans = {
    monthly: {
      price: '$29',
      period: '/mes',
      total: '$29/mes',
    },
    annual: {
      price: '$290',
      period: '/año',
      total: '$24.17/mes',
      savings: 'Ahorra $58 al año',
    },
  };

  const features = [
    'Análisis ilimitados de papers',
    'Acceso prioritario a nuevas funciones',
    'Exportación de datos en múltiples formatos',
    'Alertas personalizadas en tiempo real',
    'Integración con bases de datos científicas',
    'Soporte técnico prioritario 24/7',
    'Almacenamiento de hasta 10GB',
    'Colaboración en equipo (hasta 5 usuarios)',
  ];

  const handleSubscribe = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la integración con el procesador de pagos
    alert('Suscripción activada exitosamente!');
    onClose();
    setShowPaymentForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SciTech Agent Plus</h2>
              <p className="text-sm text-gray-400">Desbloquea todo el potencial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showPaymentForm ? (
          <div className="p-6">
            {/* Plan Selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Monthly Plan */}
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedPlan === 'monthly'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Plan Mensual</h3>
                    <p className="text-sm text-gray-400">Facturación mensual</p>
                  </div>
                  {selectedPlan === 'monthly' && (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plans.monthly.price}</span>
                  <span className="text-gray-400">{plans.monthly.period}</span>
                </div>
              </button>

              {/* Annual Plan */}
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`p-6 rounded-lg border-2 transition-all text-left relative ${
                  selectedPlan === 'annual'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MEJOR VALOR
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Plan Anual</h3>
                    <p className="text-sm text-gray-400">Facturación anual</p>
                  </div>
                  {selectedPlan === 'annual' && (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plans.annual.price}</span>
                  <span className="text-gray-400">{plans.annual.period}</span>
                  <div className="text-sm text-teal-400 mt-1">
                    {plans.annual.total} • {plans.annual.savings}
                  </div>
                </div>
              </button>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Características incluidas</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-teal-400" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSubscribe}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-black font-semibold rounded-lg transition-all text-lg"
            >
              Suscribirse a Plus - {plans[selectedPlan].price}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Cancela en cualquier momento. Sin compromisos a largo plazo.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Payment Form */}
            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Método de pago</h3>
                <p className="text-sm text-gray-400">
                  Plan seleccionado: <span className="text-teal-400 font-semibold">
                    {selectedPlan === 'monthly' ? 'Mensual' : 'Anual'} - {plans[selectedPlan].price}
                  </span>
                </p>
              </div>

              {/* Card Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de tarjeta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 py-3 border border-gray-700 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-black font-semibold rounded-lg transition-all"
                >
                  Confirmar pago
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Pago seguro. Tu información está protegida.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}