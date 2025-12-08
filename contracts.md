# ARVEN House - Contratos y Documentación [ACTUALIZADO]

## Resumen del Proyecto

Landing page completa para ARVEN House con calculadora interactiva de inversiones en propiedad fraccionada de villas en Tulum.

## ACTUALIZACIÓN IMPORTANTE - Diciembre 2024

Se han actualizado TODOS los cálculos, precios y lógica de proyección según las especificaciones finales:

### Cambios Principales:
1. **Precios actualizados**: 
   - Pre-venta: $555,000 MXN / $30,000 USD
   - Descuento 10%: $499,500 MXN / $27,000 USD

2. **Rendimientos actualizados**:
   - Financiado: 5-8% anual (antes 5-7%)
   - Contado: 8-12% anual (sin cambios)
   - Frecuencia: SEMESTRAL (antes trimestral)

3. **Plusvalía agregada**:
   - Hasta $850,000 MXN en 20 meses (1 año 8 meses)
   - Curva de apreciación lineal
   - Solo aplica en MXN

4. **Lógica de financiamiento**:
   - Rendimientos comienzan DESPUÉS de liquidar
   - Usuario puede seleccionar años para liquidar (1-5 años)

## Arquitectura del Proyecto

### Frontend (React)

#### Estructura de Archivos
```
/app/frontend/src/
├── config/
│   └── theme.js                    # Configuración de marca (colores, tipografía, logo)
├── utils/
│   ├── projectionEngine.js         # Motor de cálculo de proyecciones
│   └── pdfGenerator.js             # Generador de PDFs
├── components/
│   ├── Header.jsx                  # Navegación fija
│   ├── Footer.jsx                  # Footer con contacto
│   ├── HeroSection.jsx             # Sección principal
│   ├── HowItWorksSection.jsx       # Explicación del modelo
│   ├── CalculatorSection.jsx       # Calculadora principal
│   ├── calculator/
│   │   ├── CalculatorInputs.jsx    # Controles de entrada
│   │   ├── CalculatorSummary.jsx   # Resumen de resultados
│   │   ├── CalculatorTables.jsx    # Tablas anuales/trimestrales
│   │   └── CalculatorCharts.jsx    # Gráficos (Line & Bar)
│   ├── BenefitsSection.jsx         # Beneficios clave
│   ├── FAQSection.jsx              # Preguntas frecuentes
│   └── ContactSection.jsx          # Formulario de contacto
└── App.js                          # Componente principal
```

#### Componentes Clave

**1. Motor de Proyección (`projectionEngine.js`)**

Funciones principales:
- `calculateProjection()` - Calcula proyecciones con capitalización trimestral
- `getYieldRange()` - Retorna rango de tasas según tipo de pago
- `formatCurrency()` - Formatea montos en MXN
- `formatPercent()` - Formatea porcentajes

Parámetros de entrada:
- Precio por fracción (default: 500,000 MXN)
- Número de fracciones (1-10)
- Tipo de pago: 'financed' (5-7%) o 'cash' (8-12%)
- Tasa anual (dentro del rango permitido)
- Años de proyección (1-15)

Estructura de datos de salida:
```javascript
{
  summary: {
    totalInvestment: number,
    paymentType: string,
    annualRate: number,
    years: number,
    finalBalance: number,
    totalReturns: number,
    totalROI: number
  },
  quarterlyResults: [{
    quarter: number,
    year: number,
    quarterInYear: number,
    startingBalance: number,
    interestEarned: number,
    endingBalance: number
  }],
  yearlyResults: [{
    year: number,
    startingBalance: number,
    endingBalance: number,
    totalInterest: number,
    totalROI: number
  }]
}
```

**2. Generador de PDF (`pdfGenerator.js`)**

Función principal:
- `generatePDF(projectionData, inputs)` - Crea PDF con jsPDF

Contenido del PDF:
- Header con logo y marca
- Parámetros de inversión
- Resumen ejecutivo
- Tabla de proyección anual
- Disclaimer legal
- Footer con contacto

**3. Calculadora (`CalculatorSection.jsx`)**

Estados principales:
- `pricePerFraction` - Precio por fracción
- `numberOfFractions` - Cantidad de fracciones
- `paymentType` - Tipo de pago ('cash' o 'financed')
- `annualRate` - Tasa anual seleccionada
- `years` - Años de proyección
- `projectionData` - Resultados calculados

Interactividad:
- Actualización en tiempo real de todos los cálculos
- Gráficos interactivos con Recharts
- Tabs para vista anual/trimestral
- Exportación a PDF

### Colores de Marca

```javascript
{
  bosque: '#41472D',        // Verde oscuro - color principal
  coconutMilk: '#FFFBF2',   // Crema off-white - fondos
  buttermilk: '#EFE6AB',    // Amarillo pálido - acentos
}
```

### Tipografía

- **Headings**: 'Pinyon Script' (elegante, manuscrita)
- **Body**: 'Inter' (moderna, legible)

### Backend (FastAPI)

**Nota**: El frontend está completamente funcional de forma independiente. No requiere backend para:
- Cálculos de proyección (se hacen en el cliente)
- Generación de PDF (se hace en el navegador)
- Formulario de contacto (solo frontend por ahora)

Si en el futuro se desea agregar backend:

#### Endpoints Sugeridos

```python
# Guardar consulta de contacto
POST /api/contact
Body: {
  name: string,
  email: string,
  phone: string,
  investment: string,
  message: string
}

# Guardar proyección del usuario
POST /api/projections
Body: {
  user_email: string,
  projection_data: object
}

# Obtener proyecciones guardadas
GET /api/projections/:email
```

#### Modelos MongoDB Sugeridos

```python
# Modelo de Contacto
class ContactLead:
  name: str
  email: str
  phone: str
  investment: str
  message: str
  created_at: datetime

# Modelo de Proyección Guardada
class SavedProjection:
  user_email: str
  price_per_fraction: int
  number_of_fractions: int
  payment_type: str
  annual_rate: float
  years: int
  projection_results: dict
  created_at: datetime
```

## Integración Futura con Excel/CSV

El motor de proyección (`projectionEngine.js`) está diseñado para ser reemplazado fácilmente:

1. Cargar archivo Excel/CSV con datos reales de performance
2. Parsear columnas: quarter, year, starting_balance, interest_earned, ending_balance
3. Reemplazar la lógica de `calculateProjection()` con los datos del archivo
4. Mantener la misma estructura de datos de salida para compatibilidad con UI

Ejemplo de integración:
```javascript
// Futuro: Reemplazar cálculo simple con datos de Excel
import { parseExcelFile } from './excelParser';

export async function calculateProjectionFromExcel(file, params) {
  const rawData = await parseExcelFile(file);
  // Transformar datos del Excel al formato esperado
  return {
    summary: {...},
    quarterlyResults: [...],
    yearlyResults: [...]
  };
}
```

## Estado Actual

✅ **Completado**:
- Landing page completa con 6 secciones
- Calculadora interactiva con proyecciones en tiempo real
- Gráficos (Line chart y Bar chart)
- Tablas (Anual y Trimestral)
- Exportación a PDF funcional
- Formulario de contacto (frontend only)
- Diseño responsive
- Colores y tipografía de marca
- Animaciones suaves

🔄 **Pendiente (si se requiere)**:
- Integración con backend para guardar contactos
- Autenticación de usuarios
- Panel de administración
- Envío de emails automatizados
- Integración con datos reales de Excel/CSV
- Analytics y tracking

## Cómo Ejecutar

```bash
# Frontend ya está corriendo en http://localhost:3000
# Los cambios se reflejan automáticamente con hot reload

# Para instalar nuevas dependencias:
cd /app/frontend
yarn add [package-name]

# Backend (si se implementa)
cd /app/backend
pip install -r requirements.txt
```

## Mantenimiento

### Actualizar Colores de Marca
Editar `/app/frontend/src/config/theme.js`

### Modificar Lógica de Cálculo
Editar `/app/frontend/src/utils/projectionEngine.js`

### Agregar Nuevas Secciones
1. Crear componente en `/app/frontend/src/components/`
2. Importar y agregar en `App.js`
3. Agregar link en navegación (`Header.jsx`)

### Personalizar PDF
Editar `/app/frontend/src/utils/pdfGenerator.js`
