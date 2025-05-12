import json
import os

# 현재 파일 경로 기준
base_dir = os.path.dirname(__file__)

mapped_file = os.path.join(base_dir, "Condition_List_Mapped.json")
summary_file = os.path.join(base_dir, "ConditionSummaries.json")
output_file = os.path.join(base_dir, "Merged_Conditions_With_Summary.json")

# 파일 읽기
with open(mapped_file, "r", encoding="utf-8") as f:
    mapped_data = json.load(f)

with open(summary_file, "r", encoding="utf-8") as f:
    summaries = json.load(f)

# Summary 매핑 (ConditionName 기준)
summary_dict = {item["ConditionName"]: item for item in summaries}

# 병합
merged = []
for cond in mapped_data:
    name = cond["ConditionName"]
    summary_info = summary_dict.get(name, {})
    merged.append(
        {
            "ConditionID": cond["ConditionID"],
            "ConditionName": name,
            "SymptomIDs": cond["SymptomIDs"],
            "ShortSummary": summary_info.get("ShortSummary", ""),
            "Link": summary_info.get("Link", ""),
        }
    )

# 결과 저장
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(merged, f, ensure_ascii=False, indent=2)
