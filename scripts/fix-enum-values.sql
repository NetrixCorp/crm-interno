-- Agregar de vuelta los valores originales del CRM interno a DealStage
ALTER TYPE "DealStage" ADD VALUE IF NOT EXISTS 'Lead';
ALTER TYPE "DealStage" ADD VALUE IF NOT EXISTS 'Propuesta_Enviada';
ALTER TYPE "DealStage" ADD VALUE IF NOT EXISTS 'Negociacion';
ALTER TYPE "DealStage" ADD VALUE IF NOT EXISTS 'Cerrado';
ALTER TYPE "DealStage" ADD VALUE IF NOT EXISTS 'Perdido';

-- Agregar de vuelta los valores originales del CRM interno a ContactSource
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'WhatsApp';
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'Instagram';
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'Referido';
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'Web';
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'LinkedIn';
ALTER TYPE "ContactSource" ADD VALUE IF NOT EXISTS 'Otro';

-- Agregar de vuelta los valores originales del CRM interno a ServiceType
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'CRM';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Landing';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Ecommerce';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Dashboard';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Chatbot';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Automatizacion';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Web';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'API';
ALTER TYPE "ServiceType" ADD VALUE IF NOT EXISTS 'Diagnostico';

-- Verificar que quedaron en el enum
SELECT t.typname, e.enumlabel
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN ('DealStage', 'ContactSource', 'ServiceType')
ORDER BY t.typname, e.enumsortorder;
