//Exported using: GeniE V7.10-03 started 27-Oct-2021 11:47:00
//Units
GenieRules.Units.setInputUnit(Angle, "deg");

//***** PROPERTIES *****//
//Sections
Low_Leg = PipeSection(1.2 m, 0.05 m);
Mid_leg = PipeSection(1.2 m, 0.035 m);
Up_Leg = PipeSection(1.2 m, 0.04 m);
Brace = PipeSection(0.8 m, 0.02 m);
Monopile = PipeSection(2.082 m, 0.06 m);

//Materials
Steel = MaterialLinear(550000000 Pa, 7850 kg/m^3, 2.1e+11 Pa, 0.3, 1.2e-05 delC^-1, 0.03 N*s/m);

//Pile Characteristics
PileType1 = PileCharacteristics(0 kg/m^3, tcInfinite);

//Thicknesses
T1 = Thickness(0.01 m);

//***** RULES *****//
//Compatibility Rules
GenieRules.Compatibility.version = "V7.10-3";
GenieRules.Compatibility.enable(SetDefaultNames, true);
GenieRules.Compatibility.enable(CaseInsensitiveFunctions, true);
GenieRules.Compatibility.enable(JournalledDefaultPrefix, true);
GenieRules.Compatibility.enable(SimplifyTopologyEnhancedVertexRemoval, true);
GenieRules.Compatibility.enable(PlateSnapping, true);
GenieRules.Compatibility.enable(PlateSortingCOGFirst, true);
GenieRules.Compatibility.enable(CurveSnapping, true);
GenieRules.Compatibility.enable(DefaultLongFemNames, true);
GenieRules.Compatibility.enable(DefaultEccentricHinghes, true);
GenieRules.Compatibility.enable(AutomaticallySaveModelAfterAnalysis, false);
GenieRules.Compatibility.enable(ValidateTransforms, true);
GenieRules.Compatibility.enable(CheckPlatesForErrorsDuringCreation, true);
GenieRules.Compatibility.enable(UseTopologySimplificationVersion7, true);
GenieRules.Compatibility.enable(UseSpliceVersionV, true);
GenieRules.Compatibility.enable(PreferLinearDependencies, true);
GenieRules.Compatibility.enable(PostponeFEMFileWrite, true);
GenieRules.Compatibility.enable(PostponeLoadApplication, true);
GenieRules.Compatibility.enable(UseSestra10, true);
GenieRules.Compatibility.enable(BucklingCapacityForSegmentedMembers, true);
GenieRules.Compatibility.enable(AlternativeJointBraceClassification, true);
GenieRules.Compatibility.enable(UseAutoSegmentation, false);
GenieRules.Compatibility.enable(AccurateCorrosionAddition, true);

//Connected Move Rules
GenieRules.ConnectedMove.useStructuralPoints = false;
GenieRules.ConnectedMove.defaultConnected = false;
GenieRules.ConnectedMove.rearrangeXJoints = false;

//Geometry Rules
GenieRules.Geometry.beamTopologySnapping = true;
GenieRules.Geometry.guideCurveTopologySnapping = true;
GenieRules.Geometry.creationGrouping = cgGroupingOff;

//Joint Creation Rules
GenieRules.JointCreation.autoGenerate = false;
GenieRules.JointCreation.selectionAware = false;
GenieRules.JointCreation.exclude(geFreeThroughBeams, true);
GenieRules.JointCreation.exclude(geThroughBeamPure, true);
GenieRules.JointCreation.exclude(geThroughBeams, false);
GenieRules.JointCreation.exclude(geFreeBeamEnds, true);
GenieRules.JointCreation.exclude(ge2BeamAligned, true);
GenieRules.JointCreation.exclude(geBeamEnds, false);

//JointDesign Rules
GenieRules.JointDesign.setDefaultCanRule(0.25, 0.3 m);
GenieRules.JointDesign.setDefaultStubRule(1, 0.6 m);
GenieRules.JointDesign.coneAngle = 9.462322208 deg;
GenieRules.JointDesign.minimumGap = 0.0508 m;
GenieRules.JointDesign.gapTolerance = 0.001 m;
GenieRules.JointDesign.planeTolerance = 1 deg;
GenieRules.JointDesign.braceAngleMoveLimit = 10 deg;
GenieRules.JointDesign.chordAlignmentTolerance = 5 deg;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.iterations = 2;
GenieRules.JointDesign.AutoAdjustSegmentLength = false;

//Local Joint Flexibility (LJF) Rules
GenieRules.LJF.method = ljfBuitrago1993;
GenieRules.LJF.setLimit(ljfAxial, 0.1, 5);
GenieRules.LJF.setLimit(ljfIPB, 0.1, 5);
GenieRules.LJF.setLimit(ljfOPB, 0.1, 5);

//Meshing rules
GenieRules.Meshing.elementType = mp1stOrder;
GenieRules.Meshing.superElementType = 1;
GenieRules.Meshing.autoSimplifyTopology = true;
GenieRules.Meshing.autoSplitPeriodicGeometry = false;
GenieRules.Meshing.repairSplitTopology = false;
GenieRules.Meshing.preference(mpPreferRectangularMesh, false);
GenieRules.Meshing.preference(mpAllowTriangularElements, true);
GenieRules.Meshing.preference(mpPreferPointMassAsNodeMass, true);
GenieRules.Meshing.preference(mpUseDrillingElements, false);
GenieRules.Meshing.preference(mpUseEccentricHinges, true);
GenieRules.Meshing.eliminateInternalEdges = true;
GenieRules.Meshing.eliminateInternalVertices = true;
GenieRules.Meshing.preference(mpIncludeUnusedProperties, false);
GenieRules.Meshing.preference(mpEliminateInternalEccentricities, false);
GenieRules.Meshing.preference(mpIgnoreFilletRadius, false);
GenieRules.Meshing.preference(mpPreferLinearDependencies, true);
GenieRules.Meshing.preference(mpUseLongLoadcaseNames, true);
GenieRules.Meshing.preference(mpUseLongSetNames, true);
GenieRules.Meshing.preference(mpUseLongPropertyNames, true);
GenieRules.Meshing.preference(mpMeshDensityRounded, false);
GenieRules.Meshing.scantlings = msGross;
GenieRules.Meshing.ignoreEccentricities = false;
GenieRules.Meshing.useCocentricBeams = false;
GenieRules.Meshing.faceMeshStrategy = SesamQuadMesher;
GenieRules.Meshing.edgeMeshStrategy = UniformDistributionEdge;
GenieRules.Meshing.activate(mpMaxAngle, mpFail, true);
GenieRules.Meshing.setLimit(mpMaxAngle, mpFail, 179 deg);
GenieRules.Meshing.activate(mpMaxAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxAngle, mpSplit, 165 deg);
GenieRules.Meshing.activate(mpMinAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpFail, 1 deg);
GenieRules.Meshing.activate(mpMinAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpSplit, 15 deg);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpFail, 10);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpSplit, 5);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpFail, 0);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpSplit, 0.2);
GenieRules.Meshing.activate(mpMinEdge, false);
GenieRules.Meshing.setLimit(mpMinEdge, 0.1);
GenieRules.Meshing.activate(mpMinEdgeByLength, false);
GenieRules.Meshing.setLimit(mpMinEdgeByLength, 0 m);
GenieRules.Meshing.activate(mpMinNonConceptualEdge, false);
GenieRules.Meshing.setLimit(mpMinNonConceptualEdge, 1);
GenieRules.Meshing.activate(mpMaxChord, false);
GenieRules.Meshing.setLimit(mpMaxChord, 0.2);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpFail, 30 deg);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpSplit, 10 deg);
GenieRules.Meshing.activate(mpMinMaxDensityRatio, false);
GenieRules.Meshing.setLimit(mpMinMaxDensityRatio, 0.1);
GenieRules.Meshing.basicLCfactor = 1;
GenieRules.Meshing.analysisFolders = true;
GenieRules.Meshing.preference(mpAdjustNumberOfElements, true);
GenieRules.Meshing.useUniformizedFaceParameterization = false;
GenieRules.Meshing.longitudinalMassOnNonStructuralElements = true;

//Tolerances Rules
GenieRules.Tolerances.angleTolerance = 2 deg;
GenieRules.Tolerances.pointTolerance = 0.01 m;
GenieRules.Tolerances.useTolerantModelling = true;

//Set Rules
GenieRules.Sets.scriptCompact = true;

//Beam Creation Rules
GenieRules.BeamCreation.DefaultCurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//Beam Creation Rules
GenieRules.Transformation.CopyTransformerMethod = tmUseModelTransformer;

//***** STRUCTURE *****//
//Plates
Steel.setDefault();

Low_Leg.setDefault();
LL1 = Beam(Point(6 m,6 m,-50 m), Point(5.33 m,5.33 m,-24.614 m));
LL1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

LL2 = Beam(Point(-6 m,6 m,-50 m), Point(-5.33 m,5.33 m,-24.614 m));
LL2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

LL3 = Beam(Point(6 m,-6 m,-50 m), Point(5.33 m,-5.33 m,-24.614 m));
LL3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

LL4 = Beam(Point(-6 m,-6 m,-50 m), Point(-5.33 m,-5.33 m,-24.614 m));
LL4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Mid_leg.setDefault();
ML1 = Beam(Point(4 m,4 m,16.15 m), Point(5.33 m,5.33 m,-24.614 m));
ML1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

ML2 = Beam(Point(-4 m,4 m,16.15 m), Point(-5.33 m,5.33 m,-24.614 m));
ML2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

ML3 = Beam(Point(4 m,-4 m,16.15 m), Point(5.33 m,-5.33 m,-24.614 m));
ML3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

ML4 = Beam(Point(-4 m,-4 m,16.15 m), Point(-5.33 m,-5.33 m,-24.614 m));
ML4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Up_Leg.setDefault();
UL1 = Beam(Point(4 m,4 m,16.15 m), Point(4 m,4 m,20.15 m));
UL1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

UL2 = Beam(Point(-4 m,4 m,16.15 m), Point(-4 m,4 m,20.15 m));
UL2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

UL3 = Beam(Point(4 m,-4 m,16.15 m), Point(4 m,-4 m,20.15 m));
UL3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

UL4 = Beam(Point(-4 m,-4 m,16.15 m), Point(-4 m,-4 m,20.15 m));
UL4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Brace.setDefault();
MB1 = Beam(Point(5.967 m,5.967 m,-44.001 m), Point(-5.967 m,5.967 m,-44.001 m));
MB1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

MB2 = Beam(Point(-5.967 m,-5.967 m,-44.001 m), Point(-5.967 m,5.967 m,-44.001 m));
MB2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

MB3 = Beam(Point(-5.967 m,-5.967 m,-44.001 m), Point(5.967 m,-5.967 m,-44.001 m));
MB3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

MB4 = Beam(Point(5.967 m,5.967 m,-44.001 m), Point(5.967 m,-5.967 m,-44.001 m));
MB4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B1 = Beam(Point(5.939 m,5.939 m,-43.127 m), Point(5.333 m,-5.333 m,-24.614 m));
B1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B2 = Beam(Point(5.939 m,-5.939 m,-43.127 m), Point(5.333 m,5.333 m,-24.614 m));
B2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B3 = Beam(Point(-5.939 m,5.939 m,-43.127 m), Point(-5.333 m,-5.333 m,-24.614 m));
B3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B4 = Beam(Point(-5.939 m,-5.939 m,-43.127 m), Point(-5.333 m,5.333 m,-24.614 m));
B4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B5 = Beam(Point(5.939 m,5.939 m,-43.127 m), Point(-5.333 m,5.333 m,-24.614 m));
B5.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B6 = Beam(Point(-5.939 m,5.939 m,-43.127 m), Point(5.333 m,5.333 m,-24.614 m));
B6.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B7 = Beam(Point(5.939 m,-5.939 m,-43.127 m), Point(-5.333 m,-5.333 m,-24.614 m));
B7.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B8 = Beam(Point(-5.939 m,-5.939 m,-43.127 m), Point(5.333 m,-5.333 m,-24.614 m));
B8.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B9 = Beam(Point(5.333 m,5.333 m,-24.614 m), Point(4.82 m,-4.82 m,-8.922 m));
B9.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B10 = Beam(Point(5.333 m,-5.333 m,-24.614 m), Point(4.82 m,4.82 m,-8.922 m));
B10.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B11 = Beam(Point(-5.333 m,5.333 m,-24.614 m), Point(-4.82 m,-4.82 m,-8.922 m));
B11.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B12 = Beam(Point(-5.333 m,-5.333 m,-24.614 m), Point(-4.82 m,4.82 m,-8.922 m));
B12.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B13 = Beam(Point(5.333 m,5.333 m,-24.614 m), Point(-4.82 m,4.82 m,-8.922 m));
B13.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B14 = Beam(Point(-5.333 m,5.333 m,-24.614 m), Point(4.82 m,4.82 m,-8.922 m));
B14.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B15 = Beam(Point(5.333 m,-5.333 m,-24.614 m), Point(-4.82 m,-4.82 m,-8.922 m));
B15.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B16 = Beam(Point(-5.333 m,-5.333 m,-24.614 m), Point(4.82 m,-4.82 m,-8.922 m));
B16.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B17 = Beam(Point(4.82 m,4.82 m,-8.922 m), Point(4.385 m,-4.385 m,4.378 m));
B17.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B18 = Beam(Point(4.82 m,-4.82 m,-8.922 m), Point(4.385 m,4.385 m,4.378 m));
B18.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B19 = Beam(Point(-4.82 m,4.82 m,-8.922 m), Point(-4.385 m,-4.385 m,4.378 m));
B19.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B20 = Beam(Point(-4.82 m,-4.82 m,-8.922 m), Point(-4.385 m,4.385 m,4.378 m));
B20.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B21 = Beam(Point(4.82 m,4.82 m,-8.922 m), Point(-4.385 m,4.385 m,4.378 m));
B21.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B22 = Beam(Point(-4.82 m,4.82 m,-8.922 m), Point(4.385 m,4.385 m,4.378 m));
B22.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B23 = Beam(Point(4.82 m,-4.82 m,-8.922 m), Point(-4.385 m,-4.385 m,4.378 m));
B23.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B24 = Beam(Point(-4.82 m,-4.82 m,-8.922 m), Point(4.385 m,-4.385 m,4.378 m));
B24.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B25 = Beam(Point(4.385 m,4.385 m,4.378 m), Point(4.016 m,-4.016 m,15.651 m));
B25.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B26 = Beam(Point(4.385 m,-4.385 m,4.378 m), Point(4.016 m,4.016 m,15.651 m));
B26.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B27 = Beam(Point(-4.385 m,4.385 m,4.378 m), Point(-4.016 m,-4.016 m,15.651 m));
B27.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B28 = Beam(Point(-4.385 m,-4.385 m,4.378 m), Point(-4.016 m,4.016 m,15.651 m));
B28.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B29 = Beam(Point(4.385 m,4.385 m,4.378 m), Point(-4.016 m,4.016 m,15.651 m));
B29.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B30 = Beam(Point(-4.385 m,4.385 m,4.378 m), Point(4.016 m,4.016 m,15.651 m));
B30.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B31 = Beam(Point(4.385 m,-4.385 m,4.378 m), Point(-4.016 m,-4.016 m,15.651 m));
B31.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

B32 = Beam(Point(-4.385 m,-4.385 m,4.378 m), Point(4.016 m,-4.016 m,15.651 m));
B32.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Monopile.setDefault();
Pile1 = Pile(Point(6 m,6 m,-50 m), Point(6 m,6 m,-95 m));
Pile1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Pile2 = Pile(Point(6 m,-6 m,-50 m), Point(6 m,-6 m,-95 m));
Pile2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Pile3 = Pile(Point(-6 m,6 m,-50 m), Point(-6 m,6 m,-95 m));
Pile3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Pile4 = Pile(Point(-6 m,-6 m,-50 m), Point(-6 m,-6 m,-95 m));
Pile4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

T1.setDefault();

Aft = Plate(Point(4.8 m,-4.8 m,16.15 m), Point(4.8 m,-4.8 m,20.15 m), Point(-4.8 m,-4.8 m,20.15 m), Point(-4.8 m,-4.8 m,16.15 m));

Fore = Plate(Point(4.8 m,4.8 m,16.15 m), Point(4.8 m,4.8 m,20.15 m), Point(-4.8 m,4.8 m,20.15 m), Point(-4.8 m,4.8 m,16.15 m));

Left = Plate(Point(-4.8 m,-4.8 m,16.15 m), Point(-4.8 m,-4.8 m,20.15 m), Point(-4.8 m,4.8 m,20.15 m), Point(-4.8 m,4.8 m,16.15 m));

Right = Plate(Point(4.8 m,-4.8 m,16.15 m), Point(4.8 m,-4.8 m,20.15 m), Point(4.8 m,4.8 m,20.15 m), Point(4.8 m,4.8 m,16.15 m));

Base = Plate(Point(4.8 m,4.8 m,16.15 m), Point(-4.8 m,4.8 m,16.15 m), Point(-4.8 m,-4.8 m,16.15 m), Point(4.8 m,-4.8 m,16.15 m));

Top = Plate(Point(4.8 m,4.8 m,20.15 m), Point(-4.8 m,4.8 m,20.15 m), Point(-4.8 m,-4.8 m,20.15 m), Point(4.8 m,-4.8 m,20.15 m));

//***** GUIDING GEOMETRY *****//
//Guiding Geometry
GP_Base = GuidePlane(Point(-10 m,-10 m,20.15 m), Point(10 m,-10 m,20.15 m), Point(10 m,10 m,20.15 m), Point(-10 m,10 m,20.15 m), 2, 2, 1, 1, 1, 1);
GP_Top = GuidePlane(Point(-10 m,-10 m,90.55 m), Point(10 m,-10 m,90.55 m), Point(10 m,10 m,90.55 m), Point(-10 m,10 m,90.55 m), 2, 2, 1, 1, 1, 1);

//***** ENVIRONMENT *****//
//***** EQUIPMENTS *****//
//***** SETS ( Create ) *****//
//***** LOAD MODELLING AND ANALYSIS *****//
//***** LOAD INTERFACES *****//
//***** MODEL VIEWS *****//
//***** SETS ( Fill ) *****//
