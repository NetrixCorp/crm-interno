-- Agregar businessId a contacts
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'netrix-interno';

-- Agregar businessId a deals
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'netrix-interno';

-- Agregar businessId a activities
ALTER TABLE activities
ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'netrix-interno';

-- Agregar businessId a calendar_events
ALTER TABLE calendar_events
ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'netrix-interno';

-- Agregar businessId a automation_logs
ALTER TABLE automation_logs
ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'netrix-interno';

-- Verificar que quedó bien
SELECT
  'contacts' as tabla,
  COUNT(*) as total,
  COUNT(business_id) as con_business_id
FROM contacts
UNION ALL
SELECT 'deals', COUNT(*), COUNT(business_id) FROM deals
UNION ALL
SELECT 'activities', COUNT(*), COUNT(business_id) FROM activities;
